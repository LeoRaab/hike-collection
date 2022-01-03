import {Component} from '@angular/core';
import Author from '../../core/models/author.model';
import {AuthorService} from '../../core/services/author.service';
import {UserService} from '../../core/services/user.service';
import {LoggerService} from '../../core/services/logger.service';
import firebase from 'firebase/compat';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user?: firebase.User;

  author: Author = {
    name: '',
    friendsList: [],
    avatar: ''
  };

  email: string;
  password: string;
  isRegistrationFinished: boolean;

  constructor(private userService: UserService,
              private authorService: AuthorService,
              private router: Router,
              private loggerService: LoggerService) {
  }

  register() {
    this.userService.registerUser(this.email, this.password)
      .then((user) => {
        this.user = user;
        this.authorService.addAuthor(this.user.uid, this.author);
        this.loggerService.debug('User registered!');
        user.sendEmailVerification()
          .then(() => {
            this.router.navigate(['/verify']);
            this.loggerService.debug('Sent email verification link!');
          })
          .catch(() => {
            /**
             * TODO: Display error
             */
            this.loggerService.error('Sending email verification link failed!');
          });
      })
      .catch(() => {
        this.loggerService.error('Register user failed!');
      });
  }

}