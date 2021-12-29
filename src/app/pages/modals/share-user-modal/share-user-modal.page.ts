import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-share-user-modal',
  templateUrl: './share-user-modal.page.html',
  styleUrls: ['./share-user-modal.page.scss'],
})
export class ShareUserModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
