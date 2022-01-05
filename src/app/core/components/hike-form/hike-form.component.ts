import {Component, EventEmitter, Input, Output} from '@angular/core';
import Hike from '../../models/hike.model';
import {LoggerService} from '../../services/logger.service';
import {ModalController} from '@ionic/angular';
import {PictureModalPage} from '../../../pages/modals/picture-modal/picture-modal.page';
import {HikeService} from '../../services/hike.service';
import {ConfigService} from '../../services/config.service';
import {CameraSource} from '@capacitor/camera';
import {PictureService} from '../../services/picture.service';
import {AuthorService} from '../../services/author.service';

@Component({
  selector: 'app-hike-form',
  templateUrl: './hike-form.component.html',
  styleUrls: ['./hike-form.component.scss'],
})
export class HikeFormComponent {
  @Output() saveHike = new EventEmitter<Hike>();

  @Input() hike: Hike = {
    hikeId: this.hikeService.generateHikeId(),
    author: this.authorService.getAuthor(),
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

  cameraSource = CameraSource;

  constructor(
    private hikeService: HikeService,
    private configService: ConfigService,
    private modalController: ModalController,
    private loggerService: LoggerService,
    private pictureService: PictureService,
    private authorService: AuthorService
  ) {
  }

  handleSaveClick() {
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

  public addPicture(cameraSource: CameraSource): void {
    this.configService.showLoadingSpinner();
    this.pictureService.getPicture(cameraSource)
      .then((photo) => {
        this.pictureService.uploadPicture(photo, this.hike.hikeId)
          .then((filePath) => {
            this.updatePictureCollection(filePath);
            this.configService.hideLoadingSpinner();
            this.loggerService.debug('Picture uploaded!');
          })
          .catch((e) => {
            this.configService.hideLoadingSpinner();
            this.loggerService.error('Uploading picture failed!');
          });
      })
      .catch(() => {
        this.configService.hideLoadingSpinner();
        this.loggerService.error('Getting picture failed!');
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
