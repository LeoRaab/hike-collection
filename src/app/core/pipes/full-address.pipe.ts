import { Pipe, PipeTransform } from '@angular/core';
import LocationAddress from '../models/location-address.model';

@Pipe({
  name: 'fullAddress'
})
export class FullAddressPipe implements PipeTransform {

  transform(address: LocationAddress): string {
    return `${ address.street }, ${ address.zip } ${ address.city }`;
  }

}
