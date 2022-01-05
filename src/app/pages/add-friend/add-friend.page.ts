import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthorService} from '../../core/services/author.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.page.html',
  styleUrls: ['./add-friend.page.scss'],
})
export class AddFriendPage implements OnInit {

  constructor(private route: ActivatedRoute,
              private authorService: AuthorService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.authorService.addFriendToPending(params.authorId);
      });
  }

}
