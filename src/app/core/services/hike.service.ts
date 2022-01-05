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

  constructor(private hikeRepository: HikeRepository) {
  }

  getHikeCollection(orderBy: string, orderByDirection: OrderByDirection): Observable<Hike[]> {
    return this.hikeRepository.readAll(orderBy, orderByDirection);
  }

  getHike(hikeId: string): Observable<Hike> {
    return this.hikeRepository.read(hikeId);
  }

  addHike(hike: Hike, customHikeCollectionPath?: string) {
    this.hikeRepository.create(hike, customHikeCollectionPath);
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

  generateHikeId(): string {
    return this.hikeRepository.createHikeId();
  }

}
