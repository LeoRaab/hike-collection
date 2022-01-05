import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HikeService} from '../../core/services/hike.service';
import Hike from '../../core/models/hike.model';
import {LoggerService} from '../../core/services/logger.service';
import {ModalController, Platform} from '@ionic/angular';
import {MessageService} from '../../core/services/message.service';
import {ShareUserModalPage} from '../modals/share-user-modal/share-user-modal.page';
import {ShareService} from '../../core/services/share.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  hikeId: string | undefined;
  hike: Hike | undefined;

  constructor(
    public platform: Platform,
    private route: ActivatedRoute,
    private hikeService: HikeService,
    private loggerService: LoggerService,
    private messageService: MessageService,
    private modalController: ModalController,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hikeId = params.id;
      this.hikeService.getHike(this.hikeId)
        .subscribe(hike => this.hike = hike);
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
        component: ShareUserModalPage
      });
      await shareUserModal.present();
      this.loggerService.debug('Share hike');
    } else {
      this.loggerService.debug('Share cancelled');
    }
  }
}
