import {Injectable} from '@angular/core';
import Hike from '../models/hike.model';
import {LoggerService} from './logger.service';
import {Observable} from 'rxjs';
import Picture from '../models/picture.model';
import {UserService} from './user.service';
import HikeRepositoryInterface from '../interfaces/HikeRepositoryInterface';
import {FireStoreRepository} from '../repositories/FireStoreRepository';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {LocalRepository} from '../repositories/LocalRepository';
import firebase from 'firebase/compat';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
  providedIn: 'root'
})
export class HikeService {

  isOnlineMode = true;
  hikeCollection: Hike[];
  hikeRepository: HikeRepositoryInterface;

  constructor(private fireStore: AngularFirestore,
              private userService: UserService,
              private loggerService: LoggerService) {
  }

  initHikeRepository(isOnlineMode: boolean) {

    if (isOnlineMode) {
      this.hikeRepository = new FireStoreRepository(this.fireStore, this.loggerService, this.userService);
    } else {
      this.hikeRepository = new LocalRepository();
    }
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
