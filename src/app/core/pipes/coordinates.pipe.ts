import { Pipe, PipeTransform } from '@angular/core';
import LocationCoordinates from '../models/location-coordinates.model';

@Pipe({
  name: 'coordinates'
})
export class CoordinatesPipe implements PipeTransform {

  transform(locationCoordinates: LocationCoordinates, ...args: unknown[]): unknown {
    return `${ locationCoordinates.latitude }, ${ locationCoordinates.longitude }`;
  }

}