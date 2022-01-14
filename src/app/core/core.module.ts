import {NgModule} from '@angular/core';
import {LoggerService} from './services/logger.service';
import {HikeFormComponent} from './components/hike-form/hike-form.component';
import {HikeCollectionComponent} from './components/hike-collection/hike-collection.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FullAddressPipe} from './pipes/full-address.pipe';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {PictureCollectionComponent} from './components/picture-collection/picture-collection.component';
import {SwiperModule} from 'swiper/angular';
import {FormatMeterPipe} from './pipes/format-meter.pipe';
import {FormatDurationPipe} from './pipes/format-duration.pipe';
import {FilterPipe} from './pipes/filter.pipe';
import {SearchPipe} from './pipes/search.pipe';
import { FormatCoordinatesPipe } from './pipes/format-coordinates.pipe';
import { FormatAddressPipe } from './pipes/format-address.pipe';

@NgModule({
  declarations: [
    HikeCollectionComponent,
    HikeFormComponent,
    FullAddressPipe,
    PictureCollectionComponent,
    FormatMeterPipe,
    FormatDurationPipe,
    FilterPipe,
    SearchPipe,
    FormatCoordinatesPipe,
    FormatAddressPipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    AngularFireStorageModule,
    SwiperModule,
    ReactiveFormsModule
  ],
  exports: [
    HikeFormComponent,
    HikeCollectionComponent,
    FullAddressPipe,
    PictureCollectionComponent,
    FormatAddressPipe,
    FormatDurationPipe,
    FormatMeterPipe,
    FormatCoordinatesPipe,
    FilterPipe,
    SearchPipe
  ],
  providers: [LoggerService]
})
export class CoreModule {
}
