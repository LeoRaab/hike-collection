import {Component, Input, OnInit} from '@angular/core';
import Hike from '../../models/hike.model';

@Component({
  selector: 'app-hike-collection',
  templateUrl: './hike-collection.component.html',
  styleUrls: ['./hike-collection.component.scss'],
})
export class HikeCollectionComponent implements OnInit{

  @Input() hikeCollection: Hike[];

  constructor() { }

  ngOnInit() {

  }

}
