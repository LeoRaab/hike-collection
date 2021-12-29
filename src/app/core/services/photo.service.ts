/**
 * TODO: Photo-Upload
 */
import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {AngularFireStorage} from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private fireStorage: AngularFireStorage) {
  }

  public async takePhoto(hikeId) {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    return await this.uploadPhoto(photo, hikeId);
  }

  public async uploadPhotoFromGallery(hikeId) {
    /**
     * TODO: Check if file is image!
     * TOOD: ERROR Handling
     */

    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100
    });

    return await this.uploadPhoto(photo, hikeId);
  }

  public async deletePhotoFromStorage(storageUrl: string) {
    await this.fireStorage.ref(storageUrl).delete().subscribe();
  }

  private async uploadPhoto(photo: Photo, hikeId) {
    const response = await fetch(photo.webPath);
    const photoBlob = await response.blob();
    const fileName = new Date().getTime() + '.jpg';
    const filePath = '/pictures/hike_' + hikeId + '/' + fileName;
    const uploadedPhoto = await this.fireStorage.upload(filePath, photoBlob);

    return filePath;
  }
}
