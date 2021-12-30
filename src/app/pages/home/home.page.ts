/**
 * TODO: Filter kapseln, verbessern
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {HikeService} from '../../core/services/hike.service';
import {LoggerService} from '../../core/services/logger.service';
import {IonContent, ModalController} from '@ionic/angular';
import {FilterModalPage} from '../modals/filter-modal/filter-modal.page';
import Hike from '../../core/models/hike.model';
import {FilterSettings} from '../../core/models/filter-settings.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('ionContent') ionContent: IonContent;

  searchTerm = '';
  distanceToTop = 0;
  hikeCollection: Hike[] | undefined;
  filterSettings = new FilterSettings();

  constructor(private hikeService: HikeService,
              private loggerService: LoggerService,
              private modalController: ModalController) {
  }

  ngOnInit() {
    this.loadCollection();
  }

  loadCollection(event?) {
    this.hikeService.getHikeCollection(this.filterSettings.orderBy, this.filterSettings.orderMode)
      .subscribe(hikeCollection => {
        this.hikeCollection = hikeCollection;
        if (event) {
          event.target.complete();
        }
      });
  }

  async showFilterModal() {
    const modal = await this.modalController.create({
      component: FilterModalPage,
      componentProps: {
        filterSettings: this.filterSettings
      }
    });

    await modal.present();
    const {data} = await modal.onWillDismiss();

    if (data.filterSettings !== false) {
      this.filterSettings = data.filterSettings;
    }

    this.loadCollection();
  }

  ionViewWillEnter() {
    this.setDistanceToTop();
  }

  setDistanceToTop() {
    this.ionContent.getScrollElement().then(scrollElement => {
      this.distanceToTop = scrollElement.scrollTop;
    });
  }
}