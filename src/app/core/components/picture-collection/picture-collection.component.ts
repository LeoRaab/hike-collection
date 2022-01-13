import {Component, Input} from '@angular/core';
import Picture from '../../models/picture.model';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y, SwiperOptions} from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-picture-collection',
  templateUrl: './picture-collection.component.html',
  styleUrls: ['./picture-collection.component.scss'],
})
export class PictureCollectionComponent {
  @Input() pictureCollection: Picture[];

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: false,
    pagination: { clickable: true },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 40
      }
    }

  };

  constructor() { }

}
