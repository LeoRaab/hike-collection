import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthorService} from '../../core/services/author.service';
import {MessageService} from '../../core/services/message.service';
import {LoadingSpinnerService} from '../../core/services/loading-spinner.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.page.html',
  styleUrls: ['./add-friend.page.scss'],
})
export class AddFriendPage implements OnInit, OnDestroy {

  params$: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private loadingSpinnerService: LoadingSpinnerService,
              private authorService: AuthorService) {
  }

  ngOnInit() {
    this.loadingSpinnerService.show();
    this.params$ = this.route.params
      .subscribe((params) => {
        this.authorService.addFriendToPending(params.authorId)
          .then(() => {
            this.messageService.showToast('Successfully adding your new friend!', 'success');
            this.loadingSpinnerService.hide();
          })
          .catch(() => {
            this.messageService.showToast('Ooops, adding your new friend failed!', 'danger');
            this.loadingSpinnerService.hide();
        });
      });
  }

  ngOnDestroy() {
    this.params$.unsubscribe();
  }
}
