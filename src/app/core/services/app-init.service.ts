import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';
import {ConfigService} from './config.service';
import {UserService} from './user.service';
import {HikeService} from './hike.service';
import {AuthorService} from './author.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private configService: ConfigService,
              private loggerService: LoggerService,
              private userService: UserService,
              private hikeService: HikeService,
              private authorService: AuthorService) {
  }

  public init(): Promise<boolean> {
    this.loggerService.debug('Starting app init');

    return new Promise<boolean>(resolve => {
      try {
        this.configService.fetchRemoteConfig()
          .then(() => {
            this.loggerService.debug('Loaded remote config');
            this.loggerService.debug('App init complete');
            resolve(true);
          });
      } catch (e) {
        this.loggerService.error('Failed loading remote config: ' + JSON.stringify(e));
        //TODO: find alternative if remote config is not available --> (Standard-Konfig laden zum Beispiel)
      }
    });
  }

}
