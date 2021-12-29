import { Injectable } from '@angular/core';
import {NGXLogger} from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private ngxLogger: NGXLogger) {
  }

  public debug(message: string): void {
    this.ngxLogger.debug(message);
  }

  public error(message: string): void {
    this.ngxLogger.error(message);
  }

  public info(message: string): void {
    this.ngxLogger.info(message);
  }
}
