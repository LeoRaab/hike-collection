import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HikeService} from '../../core/services/hike.service';
import Hike from '../../core/models/hike.model';
import {MessageService} from '../../core/services/message.service';
import {LoggerService} from '../../core/services/logger.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  hikeId: string | undefined;
  hike: Hike | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hikeService: HikeService,
    private messageService: MessageService,
    private loggerService: LoggerService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hikeId = params.id;
      console.log(this.hikeId);
      this.hikeService.getHike(this.hikeId)
        .subscribe(hike => this.hike = hike);
    });
  }

  async handleDeleteRequest() {
    const confirmState = await this.messageService.showDialog(
      'Are you sure to delete this Hike?',
      'middle',
      'warning'
    );

    if (confirmState === 'confirm') {
      try {
        this.router.navigate(['']);
        await this.hikeService.deleteHike(this.hikeId);
        this.loggerService.debug('Hike deleted');
        await this.messageService.showToast('Hike deleted!', 'success');
      }
      catch (e) {
        this.loggerService.error(e);
        await this.messageService.showToast('Ooopsie! Hike could not be updated!', 'danger');
      }
    } else {
      this.loggerService.debug('Cancelled delete');
    }
  }

  async handleSaveRequest(hike: Hike) {
    this.loggerService.debug(JSON.stringify(hike));

    try {
      await this.hikeService.editHike(hike);
      this.loggerService.debug('Hike edited');
      await this.messageService.showToast('Hike updated!', 'success');
      this.router.navigate(['/detail/' + this.hikeId]);
    } catch (e) {
      this.loggerService.error(e);
      await this.messageService.showToast('Ooopsie! Hike could not be updated!', 'danger');
    }
  }
}
