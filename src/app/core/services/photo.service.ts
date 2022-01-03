import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {MessageService} from './message.service';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private fireStorage: AngularFireStorage,
              private messageService: MessageService,
              private loggerService: LoggerService) {
  }

  public async takePhoto(hikeId) {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    return await this.uploadPhoto(photo, hikeId);
  }

  public async uploadPhotoFromGallery(hikeId): Promise<string> {

    /**
     * TODO: Check if image!!
     */

    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100
    });

    return new Promise<string>(async (resolve, reject) => {

      try {
        const filePath = await this.uploadPhoto(photo, hikeId);
        this.loggerService.debug('Photo uploaded');
        resolve(filePath);
      } catch (e) {
        this.loggerService.error('Uploading photo failed');
        reject();
      }
    });
  }

  public deletePhotoFromStorage(storageUrl: string) {
    this.fireStorage.ref(storageUrl).delete().subscribe();
  }

  private async uploadPhoto(photo: Photo, hikeId) {

    const response = await fetch(photo.webPath);
    const photoBlob = await response.blob();
    const fileName = new Date().getTime() + '.' + photo.format;
    const filePath = '/pictures/hike_' + hikeId + '/' + fileName;
    await this.fireStorage.upload(filePath, photoBlob);

    return filePath;
  }

}
