import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';
import {ConfigService} from './config.service';
import {UserService} from './user.service';
import {HikeService} from './hike.service';
import {AuthorService} from './author.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private configService: ConfigService,
              private loggerService: LoggerService,
              private userService: UserService,
              private hikeService: HikeService,
              private authorService: AuthorService,
              private auth: AngularFireAuth,) {
  }

  public init(): Promise<void> {
    this.loggerService.debug('Starting app init');

    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.configService.fetchRemoteConfig();
      } catch (e) {
        this.loggerService.error('Failed loading remote config: ' + JSON.stringify(e));
        reject();
        //TODO: find alternative if remote config is not available --> (Standard-Konfig laden zum Beispiel)
      }

      await this.userService.loadUser();

      resolve();


    });
  }

}
