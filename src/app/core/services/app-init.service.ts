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

  public init(): Promise<void> {
    this.loggerService.debug('Starting app init');

    if (this.configService.onlineMode) {
      return this.initOnlineMode();
    } else {
      this.initLocalMode();
    }
  }

  private initOnlineMode(): Promise<void> {
    return new Promise<void>(async (resolve) => {
      try {
        await this.configService.fetchRemoteConfig();
        await this.userService.loadUser();
        this.hikeService.initHikeRepository(this.configService.onlineMode);
        this.authorService.loadAuthor();
        this.loggerService.debug('App init complete');
        resolve();
      } catch (exception) {
        //TODO: find alternative if remote config is not available --> (Standard-Konfig laden zum Beispiel)
      }
    });
  }

  private initLocalMode() {
    /**
     * TODO: Implement
     */
  }
}
