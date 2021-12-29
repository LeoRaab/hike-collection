/**
 * TODO: Delete User
 * TODO: User is null error on sign out
 * TOOD: Implement author info
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Author from '../../core/models/author.model';
import {UserService} from '../../core/services/user.service';
import Hike from '../../core/models/hike.model';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';
import {AuthorService} from '../../core/services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.page.html',
  styleUrls: ['./author.page.scss'],
})
export class AuthorPage implements OnInit {
  author: Author;
  friendsList?: Author[];

  constructor(private userService: UserService,
              private authorService: AuthorService,
              private router: Router) {

    /**
     * TODO: Nicht Collection, sondern direkt das Doc holen
     */

  }

  ngOnInit() {
    this.author = this.authorService.getAuthor();
    this.friendsList = this.authorService.getFriendsList();
    console.log(this.friendsList);
  }

  async logout() {
    await this.userService.logoutUser().then(() => {
      this.router.navigate(['/']);
    });
  }
}
