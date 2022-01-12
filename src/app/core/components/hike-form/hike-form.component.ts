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
import {FormBuilder, Validators} from '@angular/forms';

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

  hikeForm = this.formBuilder.group({
    title: ['', Validators.required],
    shortDescription: ['', Validators.required],
    longDescription: ['', Validators.required],
    location: this.formBuilder.group({
      coordinates: this.formBuilder.group({
        latitude: ['', Validators.required],
        longitude: ['', Validators.required],
      }),
      address: this.formBuilder.group({
        street: ['', Validators.required],
        zip: [0, Validators.required],
        city: ['', Validators.required],
      })
    }),
    stats: this.formBuilder.group({
      duration: [0, Validators.required],
      lowestPoint: [0, Validators.required],
      highestPoint: [0, Validators.required]
    })
  });

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
    this.hikeForm.setValue({
      title: this.hike.title,
      shortDescription: this.hike.shortDescription,
      longDescription: this.hike.longDescription,
      location: {
        coordinates: {
          latitude: this.hike.location.coordinates.latitude,
          longitude: this.hike.location.coordinates.longitude,
        },
        address: {
          street: this.hike.location.address.street,
          zip: this.hike.location.address.zip,
          city: this.hike.location.address.city,
        }
      },
      stats: {
        duration: this.hike.stats.duration,
        lowestPoint: this.hike.stats.lowestPoint,
        highestPoint: this.hike.stats.highestPoint
      }
    });
  }

  public save() {
    this.updateHikeWithFormValues();
    console.log(this.hike);
    //this.saveHike.emit(this.hike);
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
            this.loggerService.error('Uploading picture failed!');
          });
      })
      .catch(() => {
        this.loadingSpinnerService.hide();
        this.loggerService.error('Getting picture failed!');
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
