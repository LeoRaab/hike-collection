import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AuthorService} from '../../../core/services/author.service';
import Author from '../../../core/models/author.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.page.html',
  styleUrls: ['./share-modal.page.scss'],
})
export class ShareModalPage implements OnInit {

  friends?: Author[];

  constructor(private modalController: ModalController,
              private authorService: AuthorService) { }

  ngOnInit() {
    this.friends = this.authorService.getFriends(this.authorService.getAuthor().friendsList);
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  share(form: NgForm) {
    console.log(form);
  }
}
