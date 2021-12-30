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
  author?: Author;
  friends?: Author[];

  constructor(public authorService: AuthorService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.authorService.getAuthor(this.userService.getUserId()).subscribe(author => {
      this.author = author;
      this.friends = this.authorService.getFriends(this.author);
    });
  }

  async logout() {
    await this.userService.logoutUser().then(() => {
      this.router.navigate(['/']);
    });
  }
}
