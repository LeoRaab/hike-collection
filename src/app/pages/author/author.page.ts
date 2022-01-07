import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class AuthorPage implements OnInit, OnDestroy {
  author?: Author;
  friends?: Author[];
  pendingFriends?: Author[];
  addFriendUrl?: string;

  constructor(private authorService: AuthorService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.author = this.authorService.getAuthor();
    this.friends = this.authorService.getFriends(this.author.friendsList);
    this.pendingFriends = this.authorService.getFriends(this.author.pendingFriendsList);
    this.addFriendUrl = this.authorService.getAddFriendUrl();
  }

  ngOnDestroy() {
    this.author = undefined;
    this.friends = undefined;
    this.pendingFriends = undefined;
    this.addFriendUrl = undefined;
  }

  public confirmFriendRequest(friendId: string): void {
    this.authorService.addToFriendsList(friendId);
  }

  public denyFriendRequest(friendId: string) {
    this.authorService.removeFromPendingFriendsList(friendId);
  }

  public removeFriend(friendId: string): void {
    this.authorService.removeFromFriendList(friendId);
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
