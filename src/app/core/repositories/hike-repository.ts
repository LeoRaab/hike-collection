import Hike from '../models/hike.model';
import {Observable} from 'rxjs';
import Picture from '../models/picture.model';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {LoggerService} from '../services/logger.service';
import firebase from 'firebase/compat';
import OrderByDirection = firebase.firestore.OrderByDirection;
import {Injectable} from '@angular/core';
import {ConfigService} from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export default class HikeRepository {

  constructor(private fireStore: AngularFirestore,
              private configService: ConfigService,
              private loggerService: LoggerService) {
  }

  create(hike: Hike): void {
    this.fireStore.collection<Hike>(this.configService.getHikeCollectionPath()).add(hike)
      .then(() => this.loggerService.debug('Hike added!'))
      .catch(error => this.loggerService.error('Adding hike failed! ' + error));
  }

  read(hikeId: string): Observable<Hike> {
    return this.fireStore.doc<Hike>(this.configService.getHikeCollectionPath() + hikeId)
      .valueChanges({idField: 'hikeId'});
  }

  readAll(orderBy: string, orderByDirection: OrderByDirection): Observable<Hike[]> {
    return this.fireStore.collection<Hike>(this.configService.getHikeCollectionPath(),
        ref => ref.orderBy(orderBy, orderByDirection)).valueChanges();
  }

  update(hike: Hike): void {
    this.fireStore.doc<Hike>(this.configService.getHikeCollectionPath() + hike.hikeId).update(hike)
      .then(() => this.loggerService.debug('Hike uploaded!'))
      .catch(error => this.loggerService.error('Uploading hike failed! ' + error));
  }

  delete(hikeId): Promise<any> {
    return this.fireStore.doc<Hike>(this.configService.getHikeCollectionPath() + hikeId).delete()
      .then(() => this.loggerService.debug('Hike deleted!'))
      .catch(error => this.loggerService.error('Deleting Hike failed! ' + error));
  }

  updatePictureCollection(hikeId: string, pictureCollection: Picture[]): void {
    const hikeRef = this.fireStore.doc<Hike>(this.configService.getHikeCollectionPath() + hikeId);
    hikeRef.update({pictureCollection})
      .then(() => this.loggerService.debug('Picture uploaded!'))
      .catch(error => this.loggerService.error('Uploading picture failed! ' + error));
  }
}
