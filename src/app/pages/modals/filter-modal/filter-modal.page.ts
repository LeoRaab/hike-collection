import {Component, Input, OnDestroy} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FilterSettings} from '../../../core/models/filter-settings.model';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.page.html',
  styleUrls: ['./filter-modal.page.scss'],
})
export class FilterModalPage {

  @Input() filterSettings: FilterSettings;

  constructor(private modalController: ModalController) {
  }

  saveFilterSettings() {
    this.dismissModal(this.filterSettings);
  }

  clearFilterSettings() {
    this.dismissModal(new FilterSettings());
  }

  dismissModal(filterSettings?: FilterSettings) {
    if (filterSettings) {
      this.modalController.dismiss({
        filterSettings
      });
    } else {
      this.modalController.dismiss({
        filterSettings: false
      });
    }
  }
}
