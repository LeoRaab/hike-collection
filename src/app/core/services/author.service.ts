import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import Author from '../models/author.model';
import AuthorRepository from '../repositories/author-repository';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private authorRepository: AuthorRepository,
              private loggerService: LoggerService) {
  }

  public getAuthor(userId: string): Observable<Author> {
    return this.authorRepository.read(userId);
  }

  public getFriends(author: Author, friendsList: string[]): Author[] {
    const friends = [];

    for (const friendId of friendsList) {
      this.getAuthor(friendId).subscribe(friend => friends.push(friend));
    }

    return friends;
  }

  public addAuthor(author: Author): void {
    this.authorRepository.create(author);
  }

  public addToFriendsList(author: Author, friendId: string): void {
    //Remove friend from pendingFriendsList
    author.pendingFriendsList = author.pendingFriendsList.filter(pendingFriend => pendingFriend !== friendId);

    author.friendsList.push(friendId);
    this.authorRepository.update(author);
  }

  public addFriendToPending(author: Author, friendId: string): void {
    const isInPendingFriendsList = author.pendingFriendsList.find(pendingFriend => pendingFriend === friendId);
    const isInFriendsList = author.friendsList.find(friend => friend === friendId);

    if (!isInPendingFriendsList && !isInFriendsList) {
      author.pendingFriendsList.push(friendId);
      this.authorRepository.update(author);
      this.loggerService.debug('Friend with id ' + friendId + ' added to pending-friends-list!');
    } else {
      this.loggerService.info('Friend already in list - not added');
    }
  }

  public removeFromFriendList(author: Author, friendId: string): void {
    //Remove friend from friendsList
    author.friendsList = author.friendsList.filter(friend => friend !== friendId);
    this.authorRepository.update(author);
  }

  public removeFromPendingFriendsList(author: Author, friendId: string): void {
    author.pendingFriendsList = author.pendingFriendsList.filter(pendingFriend => pendingFriend !== friendId);
    this.authorRepository.update(author);
  }

}
