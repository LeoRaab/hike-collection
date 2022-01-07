import {Component} from '@angular/core';
import Author from '../../core/models/author.model';
import {AuthorService} from '../../core/services/author.service';
import {UserService} from '../../core/services/user.service';
import {LoggerService} from '../../core/services/logger.service';
import {Router} from '@angular/router';
import {MessageService} from '../../core/services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  author: Author = {
    authorId: '',
    name: '',
    email: '',
    friendsList: [],
    pendingFriendsList: [],
    avatar: ''
  };

  password: string;

  constructor(private userService: UserService,
              private authorService: AuthorService,
              private router: Router,
              private messageService: MessageService,
              private loggerService: LoggerService) {
  }

  public async register(): Promise<void> {
    const isAuthorNameUsed = await this.isAuthorNameUsed();

    if (isAuthorNameUsed) {
      this.messageService.showToast('Name is already in use, choose another one!', 'warning');
    } else {
      this.registerUser();
    }
  }

  private registerUser(): void {
    this.userService.registerUser(this.author.email, this.password)
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
            this.loggerService.error('Sending email verification link failed!');
          });
      })
      .catch(() => {
        this.loggerService.error('Register user failed!');
        this.messageService.showToast('Failed to register, please try again!', 'danger');
      });
  }

  private isAuthorNameUsed(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.authorService.getAuthorByName(this.author.name)
        .subscribe((authors) => {
          if (authors.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

}
