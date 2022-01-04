import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import Author from '../models/author.model';
import AuthorRepository from '../repositories/author-repository';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private authorRepository: AuthorRepository) {
  }

  public getAuthor(userId: string): Observable<Author> {
    return this.authorRepository.read(userId);
  }

  public getFriends(author: Author): Author[] {
    const friends = [];

    for (const friendId of author.friendsList) {
      this.getAuthor(friendId).subscribe(friend => friends.push(friend));
    }

    return friends;
  }

  public addAuthor(author: Author): void {
    this.authorRepository.create(author);
  }

}
