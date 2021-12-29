import { Component, OnInit } from '@angular/core';
import {ShareService} from '../../core/services/share.service';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class ImportPage implements OnInit {

  uploadedHike: string;

  constructor(public platform: Platform,
              private shareService: ShareService) { }

  ngOnInit() {
  }

  async importHike() {
   await this.shareService.importHike();
  }

}
