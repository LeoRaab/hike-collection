import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PictureModalPage } from './picture-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PictureModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PictureModalPageRoutingModule {}
