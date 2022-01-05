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
  pendingFriends?: Author[];
  addFriendUrl?: string;

  constructor(private authorService: AuthorService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.authorService.getAuthor(this.userService.getUserId())
      .subscribe(author => {
        this.author = author;
        this.friends = this.authorService.getFriends(this.author, this.author.friendsList);
        this.pendingFriends = this.authorService.getFriends(this.author, this.author.pendingFriendsList);
        /**
         * TODO: put Url in config
         */
        this.addFriendUrl = 'http://localhost:4200/author/friend/add/' + this.author.authorId;
      });
  }

  public confirmFriendRequest(friendId: string): void {
    this.authorService.addToFriendsList(this.author, friendId);
  }

  public denyFriendRequest(friendId: string) {
    this.authorService.removeFromPendingFriendsList(this.author, friendId);
  }

  public removeFriend(friendId: string): void {
    this.authorService.removeFromFriendList(this.author, friendId);
  }

  public async copyFriendLinkUrl() {
    await Clipboard.write({
      url: this.addFriendUrl
    });
  }

  public logout() {
    this.userService.logoutUser()
      .then(() => {
        this.router.navigate(['/']);
      });
  }
}
