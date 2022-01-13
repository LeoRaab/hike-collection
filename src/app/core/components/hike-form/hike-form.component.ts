import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Hike from '../../models/hike.model';
import {LoggerService} from '../../services/logger.service';
import {ModalController} from '@ionic/angular';
import {PictureModalPage} from '../../../pages/modals/picture-modal/picture-modal.page';
import {HikeService} from '../../services/hike.service';
import {ConfigService} from '../../services/config.service';
import {CameraSource} from '@capacitor/camera';
import {PictureService} from '../../services/picture.service';
import {AuthorService} from '../../services/author.service';
import {LoadingSpinnerService} from '../../services/loading-spinner.service';
import {MessageService} from '../../services/message.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-hike-form',
  templateUrl: './hike-form.component.html',
  styleUrls: ['./hike-form.component.scss'],
})
export class HikeFormComponent implements OnInit {
  @Output() saveHike = new EventEmitter<Hike>();

  @Input() hike: Hike = {
    hikeId: this.hikeService.generateHikeId(),
    author: this.authorService.getAuthor(),
    title: '',
    shortDescription: '',
    longDescription: '',
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
    stats: {
      duration: 0,
      lowestPoint: 0,
      highestPoint: 0
    },
    pictureCollection: []
  };

  hikeForm: FormGroup;

  cameraSource = CameraSource;

  constructor(
    private formBuilder: FormBuilder,
    private hikeService: HikeService,
    private configService: ConfigService,
    private modalController: ModalController,
    private loggerService: LoggerService,
    private loadingSpinnerService: LoadingSpinnerService,
    private pictureService: PictureService,
    private authorService: AuthorService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.createHikeForm();
  }

  public save() {
    this.updateHikeWithFormValues();
    this.saveHike.emit(this.hike);
  }

  public async showPictureListModal() {
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
    this.loadingSpinnerService.show();
    this.pictureService.getPicture(cameraSource)
      .then((photo) => {
        this.pictureService.uploadPicture(photo, this.hike.hikeId)
          .then((filePath) => {
            this.updatePictureCollection(filePath);
            this.loadingSpinnerService.hide();
            this.messageService.showToast('Picture added!', 'success');
            this.loggerService.debug('Picture uploaded!');
          })
          .catch((e) => {
            this.loadingSpinnerService.hide();
            this.loggerService.error('Uploading picture failed!' + JSON.stringify(e));
          });
      })
      .catch(() => {
        this.loadingSpinnerService.hide();
        this.loggerService.error('Getting picture failed!');
      });
  }

  private createHikeForm() {
    this.hikeForm = this.formBuilder.group({
      title: [this.hike.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80)]],
      shortDescription: [this.hike.shortDescription, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)]],
      longDescription: [this.hike.longDescription, [
        Validators.required,
        Validators.minLength(3)]],
      location: this.formBuilder.group({
        coordinates: this.formBuilder.group({
          latitude: [this.hike.location.coordinates.latitude, [
            Validators.required,
            Validators.min(-90),
            Validators.max(90)]],
          longitude: [this.hike.location.coordinates.longitude, [
            Validators.required,
            Validators.min(-180),
            Validators.max(180)]],
        }),
        address: this.formBuilder.group({
          street: [this.hike.location.address.street, Validators.required],
          zip: [this.hike.location.address.zip, [
            Validators.required,
            Validators.min(1000),
            Validators.max(9999)]],
          city: [this.hike.location.address.city, Validators.required],
        })
      }),
      stats: this.formBuilder.group({
        duration: [this.hike.stats.duration, [
          Validators.required,
          Validators.min(1),
          Validators.max(4320)]],
        lowestPoint: [this.hike.stats.lowestPoint, [
          Validators.required,
          Validators.min(0),
          Validators.max(8849)]],
        highestPoint: [this.hike.stats.highestPoint,[
          Validators.required,
          Validators.min(0),
          Validators.max(8849)]]
      })
    });
  }

  private updateHikeWithFormValues() {
    this.hike.title = this.hikeForm.value.title;
    this.hike.shortDescription = this.hikeForm.value.shortDescription;
    this.hike.longDescription = this.hikeForm.value.longDescription;
    this.hike.location = {
      coordinates: {
        latitude: this.hikeForm.value.location.coordinates.latitude,
        longitude: this.hikeForm.value.location.coordinates.longitude
      },
      address: {
        street: this.hikeForm.value.location.address.street,
        zip: this.hikeForm.value.location.address.zip,
        city: this.hikeForm.value.location.address.city
      }
    };
    this.hike.stats = {
      duration: this.hikeForm.value.stats.duration,
      lowestPoint: this.hikeForm.value.stats.lowestPoint,
      highestPoint: this.hikeForm.value.stats.highestPoint
    };
  }

  private updatePictureCollection(storageUrl: string) {
    const altText = storageUrl.split('/').pop();

    this.hike.pictureCollection.push({
      storageUrl,
      altText
    });
  }

}
