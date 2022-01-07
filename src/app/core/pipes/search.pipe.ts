import {Pipe, PipeTransform} from '@angular/core';
import Hike from '../models/hike.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(hikeCollection: Hike[], searchTerm: string): Hike[] {
    if (hikeCollection && searchTerm.length >= 3) {
      const filterTerm = searchTerm.toLowerCase();
      const filteredHikeCollection = [];

      for (const hike of hikeCollection) {
        const filterFields = [hike.title, hike.location.address.city, hike.location.address.street, hike.author.name];
        const matchedFields = filterFields.filter(filterField => filterField.toLowerCase().includes(filterTerm));

        if (matchedFields.length > 0) {
          filteredHikeCollection.push(hike);
        }
      }

      return filteredHikeCollection;
    }

    return hikeCollection;
  }
}
