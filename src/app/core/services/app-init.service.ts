import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';
import {ConfigService} from './config.service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private configService: ConfigService,
              private loggerService: LoggerService,
              private userService: UserService) {
  }

  public init(): Promise<void> {

    return new Promise<void>(async (resolve) => {
      this.loggerService.debug('Starting app init');

      await this.configService.fetchRemoteConfig()
        .then(() => {
          this.loggerService.debug('Loaded remote config');
        })
        .catch(() => {
          this.loggerService.error('Loading remote config failed!');
          this.loggerService.info('Loading default config instead!');
        });

      await this.userService.setUser()
        .then((user) => {
          this.configService.setHikeCollectionPath(this.userService.getUserId());
          this.loggerService.debug('Setting user with id: ' + user.uid);
        })
        .catch(() => {
          this.loggerService.error('Setting user failed');
        });

      this.loggerService.debug('App init finished');
      resolve();
    });
  }

}
