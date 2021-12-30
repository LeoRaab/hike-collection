import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {LoggerService} from './logger.service';
import firebase from 'firebase/compat';
import User = firebase.User;
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user?: User;

  constructor(private fireStore: AngularFirestore,
              private auth: AngularFireAuth,
              private configService: ConfigService,
              private loggerService: LoggerService) {
  }

  setUser(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.auth.user.subscribe((user) => {
        this.user = user;
        this.configService.setHikeCollectionPath(this.user.uid);
        this.loggerService.debug('Setting user with id: ' + this.user.uid);
        resolve(true);
      }, (error) => {
        this.loggerService.error('Setting user failed: ' + error);
        resolve(false);
      });
    });
  }

  getUserId(): string {
    return this.user.uid;
  }

  async loginUser(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        this.loggerService.debug('User signed in');
      })
      .catch((error) => {
        this.loggerService.error('Login failed: ' + error);
      });
  }

  async logoutUser() {
    await this.auth.signOut()
      .then(() => {
        this.user = undefined;
        this.loggerService.debug('User logged out');
      })
      .catch((error) => {
        this.loggerService.error('Logout failed: ' + error);
      });
  }
}
