/**
 * TODO: Pictures sollen nicht automatisch gespeichert werden
 */

import {Component, Input, OnInit} from '@angular/core';
import Picture from '../../../core/models/picture.model';
import {ModalController} from '@ionic/angular';
import {LoggerService} from '../../../core/services/logger.service';
import {MessageService} from '../../../core/services/message.service';
import {PictureService} from '../../../core/services/picture.service';

@Component({
  selector: 'app-picture-modal',
  templateUrl: './picture-modal.page.html',
  styleUrls: ['./picture-modal.page.scss'],
})
export class PictureModalPage implements OnInit {
  @Input() pictureCollection: Picture[];
  tmpPictureCollection: Picture[];

  constructor(private modalController: ModalController,
              private loggerService: LoggerService,
              private pictureService: PictureService,
              private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.loggerService.debug(JSON.stringify(this.pictureCollection));
    this.tmpPictureCollection = this.pictureCollection;
  }

  async deletePicture(pictureId) {
    const confirmState = await this.messageService.showDialog(
      'Are you sure to delete this Picture?',
      'middle',
      'warning'
    );

    if (confirmState === 'confirm') {
      const storageUrl = this.pictureCollection[pictureId].storageUrl;
      await this.pictureService.deletePictureFromStorage(storageUrl);
      this.pictureCollection.splice(pictureId, 1);
    }
  }

  savePictureCollection() {
    /**
     * TODO: Why are there two collections??
     */
    this.pictureCollection = this.tmpPictureCollection;
    this.modalController.dismiss( {
      tmpPictureCollection: this.tmpPictureCollection
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
