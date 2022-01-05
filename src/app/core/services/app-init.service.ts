import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';
import {ConfigService} from './config.service';
import {UserService} from './user.service';
import {AuthorService} from './author.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private configService: ConfigService,
              private loggerService: LoggerService,
              private userService: UserService,
              private authorService: AuthorService) {
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
        .then(async (user) => {
          this.configService.setHikeCollectionPath(this.userService.getUserId());
          await this.authorService.setAuthor(user.uid);
          this.loggerService.debug('Setting user with id: ' + user.uid);
          this.loggerService.debug('Setting author with name: ' + this.authorService.getAuthor().name);
        })
        .catch(() => {
          this.loggerService.error('Setting user failed');
        });

      this.loggerService.debug('App init finished');
      resolve();
    });
  }

}
