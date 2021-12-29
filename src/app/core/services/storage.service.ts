import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) {

  }

  getPicture(pictureId: string): Observable<any> {
    const ref = this.storage.ref('pictures/' + pictureId);
    return ref.getDownloadURL();
  }
}
