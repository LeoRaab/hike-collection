import {Component, Input, OnInit} from '@angular/core';
import Hike from '../../models/hike.model';

@Component({
  selector: 'app-hike-detail',
  templateUrl: './hike-detail.component.html',
  styleUrls: ['./hike-detail.component.scss'],
})
export class HikeDetailComponent implements OnInit {
  @Input() hike: Hike;

  constructor() { }

  ngOnInit() {}

}
