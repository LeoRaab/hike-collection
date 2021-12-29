import { Injectable } from '@angular/core';
import Hike from '../models/hike.model';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private platform: Platform) { }

  exportHike(hike: Hike) {
    const a = document.createElement('a');
    a.style.display = 'none';
    const file = new Blob([JSON.stringify(hike)], {type: 'text-plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'hike_' + hike.hikeId + '.json';
    a.click();
  }

  async importHike() {
    if (this.platform.is('mobile') || this.platform.is('tablet')) {

    }

    if (this.platform.is('desktop')) {

    }

  }
}
