import {Component, EventEmitter, Input, Output} from '@angular/core';
import Hike from '../../models/hike.model';
import {LoggerService} from '../../services/logger.service';
import {ModalController} from '@ionic/angular';
import {PictureModalPage} from '../../../pages/modals/picture-modal/picture-modal.page';
import {PhotoService} from '../../services/photo.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

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
    title: new FormControl(this.hike.title, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(80)
    ]),
    shortDescription: new FormControl(
      this.hike.shortDescription, [
        Validators.required,
        Validators.minLength(3)
      ]),
    longDescription: new FormControl(
      this.hike.longDescription, [
        Validators.required,
        Validators.minLength(3)
      ]),
    location: this.formBuilder.group({
      address: this.formBuilder.group({
        street: new FormControl(
          this.hike.location.address.street, [
            Validators.required,
            Validators.minLength(3)
          ]),
        zip: new FormControl(
          this.hike.location.address.zip, [
            Validators.required,
            Validators.min(1000),
            Validators.max(9999)
          ]),
        city: new FormControl(
          this.hike.location.address.city, [
            Validators.required,
            Validators.minLength(2)
          ]),
      }),
      coordinates: this.formBuilder.group({
        latitude: new FormControl(
          this.hike.location.coordinates.latitude, [
            Validators.required,
            Validators.min(-90),
            Validators.max(90)
          ]),
        longitude: new FormControl(
          this.hike.location.coordinates.longitude, [
            Validators.required,
            Validators.min(-180),
            Validators.max(180)
          ]),
      })
    }),
    stats: this.formBuilder.group({
      duration: new FormControl(
        this.hike.shortDescription, [
          Validators.required,
          Validators.min(1),
          Validators.max(4320) // 3 Days in minutes
        ]),
      lowestPoint: new FormControl(
        this.hike.stats.lowestPoint, [
          Validators.required,
          Validators.min(0),
          Validators.max(9000)
        ]),
      highestPoint: new FormControl(
        this.hike.stats.highestPoint, [
          Validators.required,
          Validators.min(1),
          Validators.max(9000)
        ]),
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
