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

  public setUser(): Promise<User|null> {
    return new Promise<User|null>((resolve, reject) => {
      this.auth.user.subscribe((user) => {
        this.user = user;

        if (this.user !== null && this.user !== undefined) {
          resolve(this.user);
        } else {
          reject(null);
        }
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
        this.user = null;
        this.loggerService.debug('User logged out');
      })
      .catch((error) => {
        this.loggerService.error('Logout failed: ' + error);
      });
  }
}
