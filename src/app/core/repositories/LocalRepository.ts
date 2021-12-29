import Hike from '../models/hike.model';
import {Observable} from 'rxjs';
import Picture from '../models/picture.model';
import HikeRepositoryInterface from '../interfaces/HikeRepositoryInterface';
import firebase from 'firebase/compat';
import OrderByDirection = firebase.firestore.OrderByDirection;

export class LocalRepository implements HikeRepositoryInterface{

  constructor() {
  }

  create(hike: Hike): void {
  }

  read(hikeId: string): Observable<Hike> {
    return new Observable<Hike>();
  }

  readAll(orderBy: string, orderDirection: OrderByDirection): Observable<Hike[]> {
    return new Observable<Hike[]>();
  }

  update(hike: Hike): void {
  }

  delete(hikeId): void {
  }

  updatePictureCollection(hikeId: string, pictureCollection: Picture[]): void {
  }

}
