import {Component} from '@angular/core';
import Author from '../../core/models/author.model';
import {AuthorService} from '../../core/services/author.service';
import {UserService} from '../../core/services/user.service';
import {LoggerService} from '../../core/services/logger.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  author: Author = {
    authorId: '',
    name: '',
    friendsList: [],
    avatar: ''
  };

  email: string;
  password: string;

  constructor(private userService: UserService,
              private authorService: AuthorService,
              private router: Router,
              private loggerService: LoggerService) {
  }

  register() {
    this.userService.registerUser(this.email, this.password)
      .then((user) => {
        this.author.authorId = user.uid;
        this.authorService.addAuthor(this.author);
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
