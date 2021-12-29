/**
 * TODO: Überlegen was mit Photo passiert, falls speichern des Hikes schief läuft und das Photo im Storage ist,
 *       aber nicht in Firerstore gepeichert wurde
 *
 * TODO: try and catch für takePhoto & photoFromGallery + messages!
 * TODO: Unbedingt auf den Photoupload warten
 * TODO: Photos auch aus Storage löschen
 * TODO: Werte erst in PhotoCollection speichern bei Save click -> nicht auch beim normalen schließen
 * TODO: SaveButton bei PhotoModal nur zeigen, wenn Bilder da sind
 * TODO: Duration Anzeigeformat überlegen
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import Hike from '../../models/hike.model';
import {LoggerService} from '../../services/logger.service';
import {ModalController} from '@ionic/angular';
import {PictureModalPage} from '../../../pages/modals/picture-modal/picture-modal.page';
import {PhotoService} from '../../services/photo.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-hike-form',
  templateUrl: './hike-form.component.html',
  styleUrls: ['./hike-form.component.scss'],
})
export class HikeFormComponent {
  @Output() saveHike = new EventEmitter<Hike>();

  @Input() hike: Hike = {
    hikeId: '',
    userId: '',
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

  hikeForm = this.formBuilder.group({
    title: [this.hike.title],
    shortDescription: [this.hike.shortDescription],
    longDescription: [this.hike.longDescription],
    location: this.formBuilder.group({
      coordinates: this.formBuilder.group({
        latitude: [this.hike.location.coordinates.latitude],
        longitude: [this.hike.location.coordinates.longitude]
      }),
      address: this.formBuilder.group({
        street: [this.hike.location.address.street],
        zip: [this.hike.location.address.zip],
        city: [this.hike.location.address.city]
      })
    }),
    stats: this.formBuilder.group({
      duration: [this.hike.stats.duration],
      lowestPoint: [this.hike.stats.lowestPoint],
      highestPoint: [this.hike.stats.highestPoint]
    })
  });

  constructor(
    private modalController: ModalController,
    private loggerService: LoggerService,
    private photoService: PhotoService,
    private auth: AngularFireAuth,
    private formBuilder: FormBuilder
  ) {
    this.auth.user.subscribe(user => this.hike.userId);
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

  async uploadPhotoFromGallery() {
    try {
      const photo = await this.photoService.uploadPhotoFromGallery(this.hike.hikeId);
      this.loggerService.debug('Photo from Gallery: ' + photo);
      this.updatePictureCollection(photo);
    } catch (e) {
      this.loggerService.error(e);
    }
  }

  private updatePictureCollection(storageUrl) {
    const altText = storageUrl.split('/').pop();

    this.hike.pictureCollection.push({
      storageUrl,
      altText
    });

    console.log(this.hike.pictureCollection);
  }

}
