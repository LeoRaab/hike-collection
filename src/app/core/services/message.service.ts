import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';
import {ActionSheetController, ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private loggerService: LoggerService,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) {
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      color,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  async showDialog(message: string, position: 'bottom' | 'middle' | 'top', color: string) {
    const toast = await this.toastController.create({
      message,
      position,
      color,
      buttons: [
        {
          side: 'start',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            this.loggerService.debug('Clicked cancel');
          }
        },
        {
          icon: 'checkmark',
          role: 'confirm',
          handler: () => {
            this.loggerService.debug('Clicked confirm');
          }
        }
      ]
    });
    await toast.present();

    const {role} = await toast.onDidDismiss();
    this.loggerService.debug('Dialog resolved with role' + role);

    return role;
  }

  async showActionSheet(title: string,
                        buttons: { text: string; icon: string; role: string }[]) {
    const actionSheet = await this.actionSheetController.create({
      header: title,
      buttons
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    return role;
  }

}
