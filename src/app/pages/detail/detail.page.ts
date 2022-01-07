import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HikeService} from '../../core/services/hike.service';
import Hike from '../../core/models/hike.model';
import {LoggerService} from '../../core/services/logger.service';
import {ModalController} from '@ionic/angular';
import {MessageService} from '../../core/services/message.service';
import {ShareModalPage} from '../modals/share-modal/share-modal.page';
import {LoadingSpinnerService} from '../../core/services/loading-spinner.service';
import {AuthorService} from '../../core/services/author.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  hikeId?: string;
  hike?: Hike;

  constructor(
    public authorService: AuthorService,
    private route: ActivatedRoute,
    private hikeService: HikeService,
    private loggerService: LoggerService,
    private messageService: MessageService,
    private loadingSpinnerService: LoadingSpinnerService,
    private modalController: ModalController,
  ) {
  }

  ngOnInit(): void {
    this.loadingSpinnerService.show();

    this.route.params.subscribe(params => {
      this.hikeId = params.id;
      this.hikeService.getHike(this.hikeId)
        .subscribe(hike => {
          this.hike = hike;
          this.loadingSpinnerService.hide();
        });
    });
  }

  async shareHike() {

    const buttons = [
      {
        text: 'Share hike with friends',
        icon: 'people-outline',
        role: 'share'
      }, {
        text: 'Cancel',
        icon: 'close-outline',
        role: 'cancel'
      }
    ];

    const shareRole = await this.messageService.showActionSheet('Share hike', buttons);

    if (shareRole === 'share') {
      const shareUserModal = await this.modalController.create({
        component: ShareModalPage,
        componentProps: {
          hike: this.hike
        }
      });
      await shareUserModal.present();
      this.loggerService.debug('Share hike');
    } else {
      this.loggerService.debug('Share cancelled');
    }
  }
}
