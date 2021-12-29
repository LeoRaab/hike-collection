import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string;
  password: string;

  constructor(private router: Router,
              private userService: UserService) {
  }

  async login() {
    await this.userService.loginUser(this.email, this.password)
      .then(() => {
        this.router.navigate(['/']);
      });
  }

}
