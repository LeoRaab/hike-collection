import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {AppInitService} from '../../core/services/app-init.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string;
  password: string;

  constructor(private router: Router,
              private appInitService: AppInitService,
              private userService: UserService) {
  }

  public async login(): Promise<void> {
    await this.userService.loginUser(this.email, this.password)
      .then(async () => {
        await this.appInitService.init();
        this.router.navigate(['/']);
      });
  }

}
