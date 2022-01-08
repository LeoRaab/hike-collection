import {Injectable} from '@angular/core';
import Hike from '../models/hike.model';
import {Observable} from 'rxjs';
import Picture from '../models/picture.model';
import firebase from 'firebase/compat';
import OrderByDirection = firebase.firestore.OrderByDirection;
import HikeRepository from '../repositories/hike-repository';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HikeService {

  constructor(private hikeRepository: HikeRepository) {
  }

  public getHikeCollection(orderBy: string, orderByDirection: OrderByDirection): Observable<Hike[]> {
    return this.hikeRepository.readAll(orderBy, orderByDirection);
  }

  public getHike(hikeId: string): Observable<Hike> {
    return this.hikeRepository.read(hikeId).pipe(take(1));
  }

  public addHike(hike: Hike, customHikeCollectionPath?: string) {
    this.hikeRepository.create(hike, customHikeCollectionPath);
  }

  public editHike(hike: Hike) {
    this.hikeRepository.update(hike);
  }

  public deleteHike(hikeId) {
    this.hikeRepository.delete(hikeId);
  }

  public updatePictureCollection(hikeId: string, pictureCollection: Picture[]) {
    this.hikeRepository.updatePictureCollection(hikeId, pictureCollection);
  }

  public generateHikeId(): string {
    return this.hikeRepository.createHikeId();
  }

}
