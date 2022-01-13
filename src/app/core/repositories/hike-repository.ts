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

  public create(hike: Hike, hikeCollectionPath: string = this.configService.getHikeCollectionPath()): void {
    this.fireStore.doc<Hike>(hikeCollectionPath + hike.hikeId).set(hike)
      .then(() => this.loggerService.debug('Hike added!'))
      .catch(error => this.loggerService.error('Adding hike failed! ' + error));
  }

  public createHikeId(): string {
    return this.fireStore.createId();
  }

  public read(hikeId: string): Observable<Hike> {
    return this.fireStore.doc<Hike>(this.configService.getHikeCollectionPath() + hikeId)
      .valueChanges({idField: 'hikeId'});
  }

  public readAll(orderBy: string, orderByDirection: OrderByDirection): Observable<Hike[]> {
    return this.fireStore.collection<Hike>(this.configService.getHikeCollectionPath(),
        ref => ref.orderBy(orderBy, orderByDirection)).valueChanges({idField: 'hikeId'});
  }

  public update(hike: Hike): void {
    this.fireStore.doc<Hike>(this.configService.getHikeCollectionPath() + hike.hikeId).update(hike)
      .then(() => this.loggerService.debug('Hike with id: ' + hike.hikeId + ' updated!'))
      .catch(error => this.loggerService.error('Updating hike with id: ' + hike.hikeId + ' failed! ' + error));
  }

  public delete(hikeId): Promise<any> {
    return this.fireStore.doc<Hike>(this.configService.getHikeCollectionPath() + hikeId).delete()
      .then(() => this.loggerService.debug('Hike deleted!'))
      .catch(error => this.loggerService.error('Deleting Hike failed! ' + error));
  }

  public updatePictureCollection(hikeId: string, pictureCollection: Picture[]): void {
    const hikeRef = this.fireStore.doc<Hike>(this.configService.getHikeCollectionPath() + hikeId);
    hikeRef.update({pictureCollection})
      .then(() => this.loggerService.debug('Picture uploaded!'))
      .catch(error => this.loggerService.error('Uploading picture failed! ' + error));
  }
}
