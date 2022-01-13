import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HikeService} from '../../core/services/hike.service';
import {LoggerService} from '../../core/services/logger.service';
import {IonContent, ModalController} from '@ionic/angular';
import {FilterModalPage} from '../modals/filter-modal/filter-modal.page';
import Hike from '../../core/models/hike.model';
import {FilterSettings} from '../../core/models/filter-settings.model';
import {UserService} from '../../core/services/user.service';
import {ConfigService} from '../../core/services/config.service';
import {LoadingSpinnerService} from '../../core/services/loading-spinner.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('ionContent') ionContent: IonContent;

  searchTerm = '';
  distanceToTop = 0;
  hikeCollection?: Hike[];
  hikeCollection$: Subscription;
  filterSettings = new FilterSettings();

  constructor(private hikeService: HikeService,
              private userService: UserService,
              private configService: ConfigService,
              private loadingSpinnerService: LoadingSpinnerService,
              private loggerService: LoggerService,
              private modalController: ModalController) {
  }

  ngOnInit() {
    this.loadingSpinnerService.show();
    this.loadCollection();
  }

  ngOnDestroy() {
    this.hikeCollection$.unsubscribe();
  }

  public loadCollection(event?): void {
    this.hikeCollection$ = this.hikeService.getHikeCollection(this.filterSettings.orderBy, this.filterSettings.orderMode)
      .subscribe(hikeCollection => {
        this.hikeCollection = hikeCollection;
        if (event) {
          event.target.complete();
        }
        this.loadingSpinnerService.hide();
      });
  }

  public async showFilterModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: FilterModalPage,
      componentProps: {
        filterSettings: this.filterSettings
      }
    });

    await modal.present();
    const {data} = await modal.onWillDismiss();

    if (data.filterSettings !== false && data.filterSettings !== undefined) {
      this.filterSettings = data.filterSettings;
    }

    this.loadCollection();
  }

  public ionViewWillEnter(): void {
    this.setDistanceToTop();
  }

  public setDistanceToTop(): void {
    this.ionContent.getScrollElement().then(scrollElement => {
      this.distanceToTop = scrollElement.scrollTop;
    });
  }
}
