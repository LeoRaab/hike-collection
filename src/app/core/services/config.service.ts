import {Injectable} from '@angular/core';
import {AngularFireRemoteConfig} from '@angular/fire/compat/remote-config';
import {LoggerService} from './logger.service';

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

  public setDefaultConfig(): void {
    this.config.isDarkModeEnabled = true;
    this.config.hostUrl = 'https://hike-collection.web.app';
  }

  public isDarkModeEnabled(): boolean {
    return this.config.isDarkModeEnabled;
  }

  public getHostUrl(): string {
    return this.config.hostUrl;
  }

  public setHikeCollectionPath(userId: string): void {
    this.hikeCollectionPath = 'hikes/author_' + userId + '/hikeCollection/';
  }

  public getHikeCollectionPath(): string {
    return this.hikeCollectionPath;
  }

  public showLoadingSpinner(): void {
    this.isLoading = true;
  }

  public hideLoadingSpinner(): void {
    this.isLoading = false;
  }

}
