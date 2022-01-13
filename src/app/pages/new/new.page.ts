import { Component } from '@angular/core';
import {LoggerService} from '../../core/services/logger.service';
import {MessageService} from '../../core/services/message.service';
import {Router} from '@angular/router';
import {HikeService} from '../../core/services/hike.service';
import Hike from '../../core/models/hike.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage {

  constructor(
    private router: Router,
    private loggerService: LoggerService,
    private messageService: MessageService,
    private hikeService: HikeService
  ) { }

  public async handleSaveRequest(hike: Hike): Promise<void> {
    this.loggerService.debug(JSON.stringify(hike));

    try {
      await this.hikeService.addHike(hike);
      await this.messageService.showToast('Hike saved!', 'success');
      this.router.navigate(['']);
    } catch (e) {
      this.loggerService.error(e);
      await this.messageService.showToast('Ooopsie! Hike could not be saved!', 'danger');
    }
  }
}
