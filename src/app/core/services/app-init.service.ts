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

      const isRemoteConfigFetched = await this.configService.fetchRemoteConfig();
      const isUserSet = await this.userService.setUser();

      if (isRemoteConfigFetched && isUserSet) {
        this.loggerService.debug('Finished app init');
      } else {
        this.loggerService.info('Finished app init with errors');
      }

      resolve();
    });
  }

}
