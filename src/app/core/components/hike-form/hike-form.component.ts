import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import Hike from '../../models/hike.model';
import {LoggerService} from '../../services/logger.service';
import {ModalController} from '@ionic/angular';
import {PictureModalPage} from '../../../pages/modals/picture-modal/picture-modal.page';
import {PhotoService} from '../../services/photo.service';
import {HikeService} from '../../services/hike.service';
import {ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-hike-form',
  templateUrl: './hike-form.component.html',
  styleUrls: ['./hike-form.component.scss'],
})
export class HikeFormComponent {
  @Output() saveHike = new EventEmitter<Hike>();

  @Input() hike: Hike = {
    hikeId: this.hikeService.generateHikeId(),
    title: '',
    shortDescription: '',
    longDescription: '',
    stats: {
      duration: 0,
      lowestPoint: 0,
      highestPoint: 0
    },
    location: {
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      address: {
        street: '',
        zip: 0,
        city: ''
      }
    },
    pictureCollection: []
  };

  constructor(
    private hikeService: HikeService,
    private configService: ConfigService,
    private modalController: ModalController,
    private loggerService: LoggerService,
    private photoService: PhotoService
  ) {
    console.log(this.hike.hikeId);
  }

  handleSaveClick() {
    //validate -> try and catch
    this.loggerService.debug('Clicked save form');
    this.saveHike.emit(this.hike);
  }

  async showPictureListModal() {
    const modal = await this.modalController.create({
      component: PictureModalPage,
      componentProps: {
        pictureCollection: this.hike.pictureCollection
      }
    });
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data) {
      this.hike.pictureCollection = data.tmpPictureCollection;
    }
  }

  async takePhoto() {
    try {
      const photo = await this.photoService.takePhoto(this.hike.hikeId);
      this.loggerService.debug('Taken Photo: ' + photo);
      this.updatePictureCollection(photo);
    } catch (e) {
      this.loggerService.error(e);
    }
  }

  uploadPhotoFromGallery(): void {
    this.configService.showLoadingSpinner();
    this.photoService.uploadPhotoFromGallery(this.hike.hikeId)
      .then((filePath) => {
        this.loggerService.debug('Photo from Gallery: ' + filePath);
        this.updatePictureCollection(filePath);
        this.configService.hideLoadingSpinner();
      });
  }

  private updatePictureCollection(storageUrl: string) {
    const altText = storageUrl.split('/').pop();

    this.hike.pictureCollection.push({
      storageUrl,
      altText
    });

  }

}
