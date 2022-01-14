import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AuthorService} from '../../../core/services/author.service';
import Author from '../../../core/models/author.model';
import {FormBuilder, FormArray} from '@angular/forms';
import {HikeService} from '../../../core/services/hike.service';
import Hike from '../../../core/models/hike.model';
import {MessageService} from '../../../core/services/message.service';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.page.html',
  styleUrls: ['./share-modal.page.scss'],
})
export class ShareModalPage implements OnInit {

  @Input() hike: Hike;

  friendsList?: string[];
  friends?: Author[];

  shareForm = this.formBuilder.group({
    friendsSelection: this.formBuilder.array([])
  });

  constructor(private modalController: ModalController,
              private authorService: AuthorService,
              private hikeService: HikeService,
              private messageService: MessageService,
              private formBuilder: FormBuilder) {
  }

  get friendsSelection(): FormArray {
    return this.shareForm.get('friendsSelection') as FormArray;
  }

  ngOnInit() {
    this.friendsList = this.authorService.getAuthor().friendsList;

    //fill formArray with controls
    for (const friend of this.friendsList) {
      this.addFriendToSelect();
    }

    //fetch Author[] to display infos of friends
    this.friends = this.authorService.getFriends(this.friendsList);
  }

  public addFriendToSelect(): void {
    this.friendsSelection.push(this.formBuilder.control(false));
  }

  public share(): void {
    const selectedFriends = this.getSelectedFriends();

    for (const selectedFriend of selectedFriends) {
      this.hikeService.addHike(this.hike, 'hikes/author_' + selectedFriend + '/hikeCollection/');
    }

    this.messageService.showToast('Hike shared successful!', 'success');
    this.dismissModal();
  }

  public dismissModal(): void {
    this.modalController.dismiss();
  }

  private getSelectedFriends(): Author[] {
    const selectedFriends = [];

    for (const i in this.friendsSelection.controls) {
      if (this.friendsSelection.controls[i].value === true) {
        selectedFriends.push(this.friendsList[i]);
      }
    }

    return selectedFriends;
  }
}
