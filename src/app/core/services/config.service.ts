import {Injectable} from '@angular/core';
import {AngularFireRemoteConfig} from '@angular/fire/compat/remote-config';
import {LoggerService} from './logger.service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config;
  private hikeCollectionPath: string;

  constructor(private remoteConfig: AngularFireRemoteConfig,
              private loggerService: LoggerService) {
  }

  public fetchRemoteConfig(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.remoteConfig.strings.subscribe((config) => {
        //TODO: check why we enter here twice??
        this.config = config;
        this.loggerService.debug('Loaded remote config');
        resolve(true);
      }, (error) => {
        this.loggerService.error('Loading remote config failed! - ' + error);
        //TODO: find alternative if remote config is not available --> (Standard-Konfig laden zum Beispiel)
        resolve(false);
      });
    });
  }

  public isDarkModeEnabled(): boolean {
    return this.config?.darkModeEnabled ?? false;
  }

  public setHikeCollectionPath(userId: string): void {
    this.hikeCollectionPath = 'hikes/user_' + userId + '/hikeCollection/';
  }

  public getHikeCollectionPath(): string {
    return this.hikeCollectionPath;
  }

}
