import LocationAddress from './location-address.model';
import LocationCoordinates from './location-coordinates.model';

export default interface HikeLocation {
  address: LocationAddress;
  coordinates: LocationCoordinates;
}
