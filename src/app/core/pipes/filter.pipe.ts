import {Pipe, PipeTransform} from '@angular/core';
import Hike from '../models/hike.model';
import {FilterSettings} from '../models/filter-settings.model';
import {LoggerService} from '../services/logger.service';
import {AuthorService} from '../services/author.service';
import {MessageService} from '../services/message.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(private authorService: AuthorService,
              private messageService: MessageService,
              private loggerService: LoggerService) {
  }

  transform(hikeCollection: Hike[], filterSettings: FilterSettings): Hike[] {

    const filteredCollection = [];

    for (const hike of hikeCollection) {

      if (this.isHikeMatchingFilter(hike, filterSettings)) {

        if (filterSettings.showShared) {
          filteredCollection.push(hike);
        } else {
          if (this.isHikeMatchingAuthor(hike)) {
            filteredCollection.push(hike);
          }
        }
      }

    }

    if (hikeCollection.length !== filteredCollection.length) {
      this.loggerService.debug('Collection filtered!');
      this.messageService.showToast('Collection filtered!', 'tertiary');
      return filteredCollection;
    } else {
      return hikeCollection;
    }
  }

  private isHikeMatchingFilter(hike: Hike, filterSettings: FilterSettings): boolean {
    if (hike.stats.lowestPoint >= filterSettings.lowestPoint
      && hike.stats.highestPoint >= filterSettings.highestPoint
      && hike.stats.duration >= filterSettings.duration) {
      return true;
    }
  }

  private isHikeMatchingAuthor(hike: Hike): boolean {
    if (hike.author.authorId === this.authorService.getAuthor().authorId) {
      return true;
    }
  }

}
