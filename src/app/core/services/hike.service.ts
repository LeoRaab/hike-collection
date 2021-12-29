import {Injectable} from '@angular/core';
import Hike from '../models/hike.model';
import {LoggerService} from './logger.service';
import {Observable} from 'rxjs';
import Picture from '../models/picture.model';
import {UserService} from './user.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import OrderByDirection = firebase.firestore.OrderByDirection;
import HikeRepository from '../repositories/HikeRepository';

@Injectable({
  providedIn: 'root'
})
export class HikeService {

  hikeCollection: Hike[];
  hikeRepository: HikeRepository;

  constructor(private fireStore: AngularFirestore,
              private userService: UserService,
              private loggerService: LoggerService) {
  }

  loadRepository(): void {
    this.hikeRepository = new HikeRepository(this.fireStore, this.loggerService, this.userService);
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
