import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Author from '../../core/models/author.model';
import {UserService} from '../../core/services/user.service';
import {AuthorService} from '../../core/services/author.service';
import { Clipboard } from '@capacitor/clipboard';
import {MessageService} from '../../core/services/message.service';

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
              private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.author = this.authorService.getAuthor();
    this.friends = this.authorService.getFriends(this.author.friendsList);
    this.pendingFriends = this.authorService.getFriends(this.author.pendingFriendsList);
    this.addFriendUrl = this.authorService.getAddFriendUrl();
  }

  public confirmFriendRequest(friendId: string): void {
    this.authorService.addToFriendsList(friendId);
    this.friends = this.authorService.getFriends(this.author.friendsList);
    this.pendingFriends = this.authorService.getFriends(this.author.pendingFriendsList);
    this.messageService.showToast('New friend added', 'light');
  }

  public async denyFriendRequest(friendId: string): Promise<void> {
    const confirmState = await this.messageService.showDialog(
      'Are you sure to deny friend request?',
      'middle',
      'warning'
    );

    if (confirmState === 'confirm') {
      this.authorService.removeFromPendingFriendsList(friendId);
    }
  }

  public async removeFriend(friendId: string): Promise<void> {
    const confirmState = await this.messageService.showDialog(
      'Are you sure to remove friend?',
      'middle',
      'warning'
    );

    if (confirmState === 'confirm') {
      this.authorService.removeFromFriendList(friendId);
    }
  }

  public async copyFriendLinkUrl() {
    await Clipboard.write({
      url: this.addFriendUrl
    });
    this.messageService.showToast('Url copied!', 'light');
  }

  public logout() {
    this.userService.logoutUser()
      .then(() => {
        this.router.navigate(['/']);
      });
  }
}
