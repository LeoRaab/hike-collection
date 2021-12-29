import Hike from '../models/hike.model';
import Picture from '../models/picture.model';
import {Observable} from 'rxjs';

export default interface HikeRepositoryInterface {
  create(hike: Hike): void;

  read(hikeId: string): Observable<Hike>;

  readAll(orderBy: string, orderDirection: string): Observable<Hike[]>;

  update(hike: Hike): void;

  delete(hikeId: string): void;

  updatePictureCollection(hikeId: string, pictureCollection: Picture[]): void;

}
