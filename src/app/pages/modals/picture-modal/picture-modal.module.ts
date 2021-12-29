import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PictureModalPageRoutingModule } from './picture-modal-routing.module';

import {CoreModule} from '../../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PictureModalPageRoutingModule,
    CoreModule
  ]
})
export class PictureModalPageModule {}
