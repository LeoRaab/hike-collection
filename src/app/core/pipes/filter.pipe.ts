import { Pipe, PipeTransform } from '@angular/core';
import Hike from '../models/hike.model';
import {FilterSettings} from '../models/filter-settings.model';
import {LoggerService} from '../services/logger.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(private loggerService: LoggerService) {
  }

  transform(hikeCollection: Hike[], filterSettings: FilterSettings): Hike[] {
    const filteredCollection = [];

    for (const hike of hikeCollection) {

      if (hike.stats.lowestPoint >= filterSettings.lowestPoint
        && hike.stats.highestPoint >= filterSettings.highestPoint
        && hike.stats.duration >= filterSettings.duration) {
        filteredCollection.push(hike);
      }
    }

    this.loggerService.debug('Collection filtered!');

    return filteredCollection;
  }

}
