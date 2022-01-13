import {Component} from '@angular/core';
import Author from '../../core/models/author.model';
import {AuthorService} from '../../core/services/author.service';
import {UserService} from '../../core/services/user.service';
import {LoggerService} from '../../core/services/logger.service';
import {Router} from '@angular/router';
import {MessageService} from '../../core/services/message.service';
import {FormBuilder, Validators} from '@angular/forms';
import {LoadingSpinnerService} from '../../core/services/loading-spinner.service';

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

  registerForm = this.formBuilder.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]],
    email: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(120),
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$')
    ]]

  });

  constructor(private userService: UserService,
              private authorService: AuthorService,
              private formBuilder: FormBuilder,
              private router: Router,
              private messageService: MessageService,
              private loadingSpinnerService: LoadingSpinnerService,
              private loggerService: LoggerService) {
  }

  public async register(): Promise<void> {
    this.authorService.getAuthorByName(this.author.name)
      .subscribe(authors => {
        if (authors.length > 0) {
          this.messageService.showToast('Name is already in use, choose another one!', 'warning');
        } else {
          this.loadingSpinnerService.show();
          this.updateAuthorWithFormValues();
          this.registerUser();
        }
      });
  }

  private registerUser(): void {
    this.userService.registerUser(this.author.email, this.registerForm.value.password)
      .then((user) => {
        this.author.authorId = user.uid;
        this.authorService.addAuthor(this.author);
        this.loggerService.debug('User registered!');
        user.sendEmailVerification()
          .then(() => {
            this.loadingSpinnerService.hide();
            this.router.navigate(['/verify']);
            this.loggerService.debug('Sent email verification link!');
          })
          .catch(() => {
            this.loadingSpinnerService.hide();
            this.loggerService.error('Sending email verification link failed!');
          });
      })
      .catch(() => {
        this.loadingSpinnerService.hide();
        this.loggerService.error('Register user failed!');
        this.messageService.showToast('Failed to register, please try again!', 'danger');
      });
  }

  private updateAuthorWithFormValues() {
    this.author.name = this.registerForm.value.name;
    this.author.email = this.registerForm.value.email;
  }
}
