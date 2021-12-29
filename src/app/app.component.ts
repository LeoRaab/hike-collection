/**
 * TODO: Funktionen kapseln
 * TODO: CODE verbessern
 * TODO: Loading-Spinner überall
 */
import { Component } from '@angular/core';
import {HikeService} from './core/services/hike.service';
import {UserService} from './core/services/user.service';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoading: false;

  constructor(private userService: UserService,
              private menu: MenuController) {}

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
