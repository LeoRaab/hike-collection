import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFriendPage } from './add-friend.page';

const routes: Routes = [
  {
    path: '',
    component: AddFriendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFriendPageRoutingModule {}
