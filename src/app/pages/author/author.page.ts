import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Author from '../../core/models/author.model';
import {UserService} from '../../core/services/user.service';
import {AuthorService} from '../../core/services/author.service';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-author',
  templateUrl: './author.page.html',
  styleUrls: ['./author.page.scss'],
})
export class AuthorPage implements OnInit {
  author?: Author;
  friends?: Author[];
  friendLinkUrl?: string;

  constructor(public authorService: AuthorService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.authorService.getAuthor(this.userService.getUserId())
      .subscribe(author => {
        this.author = author;
        this.friends = this.authorService.getFriends(this.author);
        /**
         * TODO: put Url in config
         */
        this.friendLinkUrl = 'http://localhost:4200/author/friend/' + this.author.authorId;
      });
  }

  async copyFriendLinkUrl() {
    await Clipboard.write({
      url: this.friendLinkUrl
    });
  }

  logout() {
    this.userService.logoutUser()
      .then(() => {
        this.router.navigate(['/']);
      });
  }
}
