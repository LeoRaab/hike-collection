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

  public isLoggedIn = false;
  private user?: User;

  constructor(private fireStore: AngularFirestore,
              private auth: AngularFireAuth,
              private configService: ConfigService,
              private loggerService: LoggerService) {
  }

  public setUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.auth.user.subscribe((user) => {
        this.user = user;
        if (this.user !== null && this.user !== undefined) {
          this.isLoggedIn = true;
          resolve(this.user);
        } else {
          reject();
        }
      });
    });
  }

  public hasEmailVerified(): boolean {
    return this.user.emailVerified;
  }

  public getUserId(): string {
    return this.user.uid;
  }

  public getEmail(): string {
    return this.user.email;
  }

  public loginUser(email: string, password: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      await this.auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          this.user = userCredential.user;
          this.loggerService.debug('User signed in');
          resolve();
        })
        .catch((error) => {
          this.loggerService.error('Login failed: ' + error);
          reject();
        });
    });
  }

  public async logoutUser(): Promise<void> {
    await this.auth.signOut()
      .then(() => {
        this.isLoggedIn = false;
        this.loggerService.debug('User logged out');
      })
      .catch((error) => {
        this.loggerService.error('Logout failed: ' + error);
      });
  }

  public async registerUser(email: string, password: string): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      await this.auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          resolve(userCredential.user);
        })
        .catch((e) => {
          console.log(e);
          reject(null);
        });
    });
  }
}
