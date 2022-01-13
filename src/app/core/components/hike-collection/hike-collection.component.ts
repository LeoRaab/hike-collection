import {Component, Input} from '@angular/core';
import Hike from '../../models/hike.model';
import {AuthorService} from '../../services/author.service';

@Component({
  selector: 'app-hike-collection',
  templateUrl: './hike-collection.component.html',
  styleUrls: ['./hike-collection.component.scss'],
})
export class HikeCollectionComponent {

  @Input() hikeCollection: Hike[];

  constructor(public authorService: AuthorService) { }

}
