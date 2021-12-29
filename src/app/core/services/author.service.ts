/**
 * TODO: Error Handling
 */

import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import Author from '../models/author.model';
import {map} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private author: Author;
  constructor(private fireStore: AngularFirestore,
              private userService: UserService) { }

  loadAuthor(): void {
    this.fireStore.collection<Author>('authors', ref => ref.where('userId', '==', this.userService.getUserId()))
      .valueChanges()
      .subscribe(author => this.author = author[0]);
  }

  getAuthor(): Author {
    return this.author;
  }

  getFriendsList(): Author[] {
    const friendsList = [];

    for (const authorId of this.author.friendsList) {
      this.getAuthorById(authorId).subscribe(author => friendsList.push(author));
    }

    return friendsList;
  }

  private getAuthorById(authorId: string): Observable<Author> {
    return this.fireStore.doc<Author>('authors/' + authorId).valueChanges();
  }

  private getAuthorByUid(userId: string) {
    let author: Author;

    this.fireStore.collection<Author>('authors', ref => ref.where('userId', '==', userId))
      .valueChanges()
      .subscribe(authorList => author = authorList[0]);

    return author;
  }


}
