import {Component, Input} from '@angular/core';
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

  public saveFilterSettings(): void {
    this.dismissModal(this.filterSettings);
  }

  public clearFilterSettings(): void {
    this.dismissModal(new FilterSettings());
  }

  public dismissModal(filterSettings?: FilterSettings): void {
    if (filterSettings) {
      this.modalController.dismiss({
        filterSettings
      });
    } else {
      this.modalController.dismiss();
    }
  }
}
