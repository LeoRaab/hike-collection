import {Injectable} from '@angular/core';
import {AngularFireRemoteConfig} from '@angular/fire/compat/remote-config';
import {LoggerService} from './logger.service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public isLoading = false;
  private config;
  private hikeCollectionPath: string;

  constructor(private remoteConfig: AngularFireRemoteConfig,
              private loggerService: LoggerService) {
  }

  public fetchRemoteConfig(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.remoteConfig.strings.subscribe((config) => {
        this.config = config;
        if (this.config !== null && this.config !== undefined) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  public isDarkModeEnabled(): boolean {
    return this.config?.isDarkModeEnabled ?? false;
  }

  public setHikeCollectionPath(userId: string): void {
    this.hikeCollectionPath = 'hikes/author_' + userId + '/hikeCollection/';
  }

  public getHikeCollectionPath(): string {
    return this.hikeCollectionPath;
  }

  public setDefaultConfig(): void {
    this.config.isDarkModeEnabled = true;
  }

  public showLoadingSpinner(): void {
    this.isLoading = true;
  }

  public hideLoadingSpinner(): void {
    this.isLoading = false;
  }

}
