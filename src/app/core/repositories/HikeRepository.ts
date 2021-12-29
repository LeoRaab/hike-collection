import Hike from '../models/hike.model';
import {Observable} from 'rxjs';
import Picture from '../models/picture.model';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {LoggerService} from '../services/logger.service';
import {UserService} from '../services/user.service';
import firebase from 'firebase/compat';
import OrderByDirection = firebase.firestore.OrderByDirection;

export default class HikeRepository {

  hikeCollectionPath: string;

  constructor(private fireStore: AngularFirestore,
              private loggerService: LoggerService,
              private userService: UserService) {

    this.hikeCollectionPath = 'hikes/user_' + this.userService.getUserId() + '/hikeCollection/';
  }

  create(hike: Hike): void {
    this.fireStore.collection<Hike>(this.hikeCollectionPath).add(hike)
      .then(() => this.loggerService.debug('Hike added!'))
      .catch(error => this.loggerService.error('Adding hike failed! ' + error));
  }

  read(hikeId: string): Observable<Hike> {
    return this.fireStore.doc<Hike>(this.hikeCollectionPath + hikeId)
      .valueChanges({idField: 'hikeId'});
  }

  readAll(orderBy: string, orderDirection: OrderByDirection): Observable<Hike[]> {
    return this.fireStore.collection<Hike>(this.hikeCollectionPath,
        ref => ref.orderBy(orderBy, orderDirection)).valueChanges();
  }

  update(hike: Hike): void {
    this.fireStore.doc<Hike>(this.hikeCollectionPath + hike.hikeId).update(hike)
      .then(() => this.loggerService.debug('Hike uploaded!'))
      .catch(error => this.loggerService.error('Uploading hike failed! ' + error));
  }

  delete(hikeId): Promise<any> {
    return this.fireStore.doc<Hike>(this.hikeCollectionPath + hikeId).delete()
      .then(() => this.loggerService.debug('Hike deleted!'))
      .catch(error => this.loggerService.error('Deleting Hike failed! ' + error));
  }

  updatePictureCollection(hikeId: string, pictureCollection: Picture[]): void {
    const hikeRef = this.fireStore.doc<Hike>(this.hikeCollectionPath + hikeId);
    hikeRef.update({pictureCollection})
      .then(() => this.loggerService.debug('Picture uploaded!'))
      .catch(error => this.loggerService.error('Uploading picture failed! ' + error));
  }
}
