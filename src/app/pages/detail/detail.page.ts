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
    private shareService: ShareService
  ) {
    this.route.params.subscribe(params => {
      this.hikeId = params.id;
      this.hikeService.getHike(this.hikeId)
        .subscribe(hike => this.hike = hike);
    });
  }

  ngOnInit(): void {
  }

  async shareHike() {

    const buttons = [
      {
        text: 'Share hike',
        icon: 'people-outline',
        role: 'send'
      },{
        text: 'Export Hike',
        icon: 'download-outline',
        role: 'export'
      }, {
        text: 'Cancel',
        icon: 'close-outline',
        role: 'cancel'
      }
    ];

    const shareRole = await this.messageService.showActionSheet('Share hike', buttons);

    switch (shareRole) {
      case 'share':
        const shareUserModal = await this.modalController.create({
          component: ShareUserModalPage
        });
        await shareUserModal.present();
        break;
      case 'export':
        this.shareService.exportHike(this.hike);
        break;
      case 'cancel':
      default:
        this.loggerService.debug('Share cancelled');
        break;
    }
  }
}
