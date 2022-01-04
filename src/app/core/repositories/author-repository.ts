import Hike from '../models/hike.model';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {LoggerService} from '../services/logger.service';
import firebase from 'firebase/compat';
import OrderByDirection = firebase.firestore.OrderByDirection;
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';
import Author from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export default class AuthorRepository {

  private authorPath = 'authors/';

  constructor(private fireStore: AngularFirestore,
              private userService: UserService,
              private loggerService: LoggerService) {
  }

  create(author: Author): void {
    this.fireStore.collection<Author>(this.authorPath).doc(author.authorId).set(author)
      .then(() => this.loggerService.debug('Author added!'))
      .catch(error => this.loggerService.error('Adding author failed! ' + error));
  }

  read(userId: string): Observable<Author> {
    return this.fireStore.doc<Author>(this.authorPath + userId).valueChanges();
  }

  readAll(orderBy: string, orderByDirection: OrderByDirection): Observable<Author[]> {
    return this.fireStore.collection<Author>(this.authorPath,
        ref => ref.orderBy(orderBy, orderByDirection)).valueChanges();
  }

  /**
   * TODO: How to retrieve userId
   */
  update(author: Author): void {
    this.fireStore.doc<Author>(this.authorPath + author.authorId).update(author)
      .then(() => this.loggerService.debug('Author with id: ' + author.authorId + ' updated!'))
      .catch(error => this.loggerService.error('Updating Author with id: ' + author.authorId + ' failed! ' + error));
  }

  delete(authorId): Promise<any> {
    return this.fireStore.doc<Hike>(this.authorPath + authorId).delete()
      .then(() => this.loggerService.debug('Hike deleted!'))
      .catch(error => this.loggerService.error('Deleting Hike failed! ' + error));
  }

}
