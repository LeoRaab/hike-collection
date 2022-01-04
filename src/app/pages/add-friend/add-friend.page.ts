import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthorService} from '../../core/services/author.service';
import {UserService} from '../../core/services/user.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.page.html',
  styleUrls: ['./add-friend.page.scss'],
})
export class AddFriendPage implements OnInit {

  constructor(private route: ActivatedRoute,
              private authorService: AuthorService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.authorService.getAuthor(this.userService.getUserId())
          .subscribe((author) => {
            this.authorService.addFriendToPending(author, params.authorId);
          });
      });
  }

}
