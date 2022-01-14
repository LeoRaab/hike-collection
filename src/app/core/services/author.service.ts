import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import Author from '../models/author.model';
import AuthorRepository from '../repositories/author-repository';
import {LoggerService} from './logger.service';
import {ConfigService} from './config.service';
import {take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private author?: Author;
  private addFriendUrl: string;

  constructor(private authorRepository: AuthorRepository,
              private configService: ConfigService,
              private loggerService: LoggerService) {
  }

  public setAuthor(userId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.authorRepository.read(userId)
        .pipe(take(1))
        .subscribe((author) => {
          this.author = author;
          if (this.author !== null && this.author !== undefined) {
            this.setAddFriendUrl();
            resolve();
          } else {
            reject();
          }
        });
    });
  }

  public getAuthor(): Author {
    return this.author;
  }

  public getAuthorById(id: string): Observable<Author> {
    return this.authorRepository.read(id).pipe(take(1));
  }

  public getAuthorByName(name: string): Observable<Author[]> {
    return this.authorRepository.readByName(name).pipe(take(1));
  }

  public getFriends(friendsList: string[]): Author[] {
    const friends = [];

    for (const friendId of friendsList) {
      this.getAuthorById(friendId).subscribe(friend => friends.push(friend));
    }

    return friends;
  }

  public addAuthor(author: Author): void {
    this.authorRepository.create(author);
  }

  public addToFriendsList(friendId: string): void {
    //Remove friend from pendingFriendsList
    this.author.pendingFriendsList = this.author.pendingFriendsList.filter(pendingFriend => pendingFriend !== friendId);

    this.author.friendsList.push(friendId);
    this.authorRepository.update(this.author);
  }

  public addFriendToPending(friendId: string): Promise<void> {
    const isInPendingFriendsList = this.author.pendingFriendsList.find(pendingFriend => pendingFriend === friendId);
    const isInFriendsList = this.author.friendsList.find(friend => friend === friendId);

    return new Promise<void>((resolve, reject) => {
      if (!isInPendingFriendsList && !isInFriendsList && friendId !== this.author.authorId) {
        try {
          this.author.pendingFriendsList.push(friendId);
          this.authorRepository.update(this.author);
          this.loggerService.debug('Friend with id ' + friendId + ' added to pending-friends-list!');
          resolve();
        } catch (e) {
          this.loggerService.error('Adding friend failed - Error ' +  JSON.stringify(e));
          reject();
        }
      } else {
        reject();
        this.loggerService.info('Friend already in list - not added');
      }
    });

  }

  public removeFromFriendList(friendId: string): void {
    this.author.friendsList = this.author.friendsList.filter(friend => friend !== friendId);
    this.authorRepository.update(this.author);
  }

  public removeFromPendingFriendsList(friendId: string): void {
    this.author.pendingFriendsList = this.author.pendingFriendsList.filter(pendingFriend => pendingFriend !== friendId);
    this.authorRepository.update(this.author);
  }

  public getAddFriendUrl(): string {
    return this.addFriendUrl;
  }

  private setAddFriendUrl(): void {
    this.addFriendUrl = this.configService.getHostUrl() + '/author/friend/add/' + this.author.authorId;
  }

}
