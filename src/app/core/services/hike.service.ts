import {Injectable} from '@angular/core';
import Hike from '../models/hike.model';
import {Observable} from 'rxjs';
import Picture from '../models/picture.model';
import firebase from 'firebase/compat';
import OrderByDirection = firebase.firestore.OrderByDirection;
import HikeRepository from '../repositories/hike-repository';

@Injectable({
  providedIn: 'root'
})
export class HikeService {

  hikeCollection: Hike[];

  constructor(private hikeRepository: HikeRepository) {
  }

  getHikeCollection(orderBy: string, orderDirection: OrderByDirection): Observable<Hike[]> {
    return this.hikeRepository.readAll(orderBy, orderDirection);
  }

  getHike(hikeId: string): Observable<Hike> {
    return this.hikeRepository.read(hikeId);
  }

  addHike(hike: Hike) {
    this.hikeRepository.create(hike);
  }

  editHike(hike: Hike) {
    this.hikeRepository.update(hike);
  }

  deleteHike(hikeId) {
    this.hikeRepository.delete(hikeId);
  }

  updatePictureCollection(hikeId: string, pictureCollection: Picture[]) {
    this.hikeRepository.updatePictureCollection(hikeId, pictureCollection);
  }

}
