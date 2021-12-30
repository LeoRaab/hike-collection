import {Component, OnInit} from '@angular/core';
import {UserService} from './core/services/user.service';
import {MenuController} from '@ionic/angular';
import {ConfigService} from './core/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(public configService: ConfigService,
              private userService: UserService,
              private menu: MenuController) {
  }

  ngOnInit() {
    this.toggleDarkTheme();
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  toggleDarkTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDark.matches && this.configService.isDarkModeEnabled()) {
      document.body.classList.add('dark');
    }
  }

}
