import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareUserModalPageRoutingModule } from './share-user-modal-routing.module';

import { ShareUserModalPage } from './share-user-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareUserModalPageRoutingModule
  ],
  declarations: [ShareUserModalPage]
})
export class ShareUserModalPageModule {}
