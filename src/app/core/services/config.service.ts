import { Injectable } from '@angular/core';
import {AngularFireRemoteConfig} from '@angular/fire/compat/remote-config';
import {LoggerService} from './logger.service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public config;
  public onlineMode = true;

  constructor(private remoteConfig: AngularFireRemoteConfig,
              private userService: UserService,
              private loggerService: LoggerService) {
  }

  public fetchRemoteConfig(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.remoteConfig.strings.subscribe((config) => {
        this.config = config;
        resolve(true);
      }, (error) => {
        this.loggerService.error('Loading remote config failed! - ' + error);
        resolve(false);
      });
    });
  }

  public isDarkModeEnabled(): boolean {
    return this.config?.darkModeEnabled ?? false;
  }

}
