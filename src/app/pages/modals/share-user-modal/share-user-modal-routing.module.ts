import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareUserModalPage } from './share-user-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ShareUserModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareUserModalPageRoutingModule {}
