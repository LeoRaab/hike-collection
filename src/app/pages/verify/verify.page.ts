import { Component } from '@angular/core';
import {UserService} from '../../core/services/user.service';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage {

  constructor(public userService: UserService) { }

}
