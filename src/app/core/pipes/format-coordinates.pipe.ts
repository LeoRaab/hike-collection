import { Pipe, PipeTransform } from '@angular/core';
import LocationCoordinates from '../models/location-coordinates.model';

@Pipe({
  name: 'formatCoordinates'
})
export class FormatCoordinatesPipe implements PipeTransform {

  transform(locationCoordinates: LocationCoordinates): string {
    return `${ locationCoordinates.latitude }°, ${ locationCoordinates.longitude }°`;
  }

}
