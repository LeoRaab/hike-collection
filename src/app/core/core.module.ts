import {NgModule} from '@angular/core';
import {LoggerService} from './services/logger.service';
import {HikeFormComponent} from './components/hike-form/hike-form.component';
import {HikeCollectionComponent} from './components/hike-collection/hike-collection.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FullAddressPipe} from './pipes/full-address.pipe';
import {CoordinatesPipe} from './pipes/coordinates.pipe';
import {HikeDetailComponent} from './components/hike-detail/hike-detail.component';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {PictureCollectionComponent} from './components/picture-collection/picture-collection.component';
import {SwiperModule} from 'swiper/angular';
import {FormatMeterPipe} from './pipes/format-meter.pipe';
import {FormatDurationPipe} from './pipes/format-duration.pipe';
import {FilterPipe} from './pipes/filter.pipe';
import {SearchPipe} from './pipes/search.pipe';

@NgModule({
  declarations: [
    HikeCollectionComponent,
    HikeFormComponent,
    FullAddressPipe,
    CoordinatesPipe,
    HikeDetailComponent,
    PictureCollectionComponent,
    FormatMeterPipe,
    FormatDurationPipe,
    FilterPipe,
    SearchPipe
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
    CoordinatesPipe,
    HikeDetailComponent,
    PictureCollectionComponent,
    FormatMeterPipe,
    FormatDurationPipe,
    FilterPipe,
    SearchPipe
  ],
  providers: [LoggerService]
})
export class CoreModule {
}