import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {MessageService} from './message.service';
import {LoggerService} from './logger.service';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private fireStorage: AngularFireStorage,
              private messageService: MessageService,
              private loggerService: LoggerService) {
  }

  public getPicture(cameraSource: CameraSource): Promise<Photo> {

    return new Promise<Photo>(async (resolve, reject) => {
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: cameraSource,
          quality: 100
        });
        resolve(photo);
      } catch (e) {
        reject();
      }
    });
  }

  public async uploadPicture(photo: Photo, hikeId): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const response = await fetch(photo.webPath);
        const photoBlob = await response.blob();
        const fileName = new Date().getTime() + '.' + photo.format;
        const filePath = '/pictures/hike_' + hikeId + '/' + fileName;
        await this.fireStorage.upload(filePath, photoBlob);
        resolve(filePath);
      } catch (e) {
        reject();
      }
    });
  }

  public deletePictureFromStorage(storageUrl: string) {
    this.fireStorage.ref(storageUrl).delete().subscribe();
  }

}
