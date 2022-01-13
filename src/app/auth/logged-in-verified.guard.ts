import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInVerifiedGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userService.isLoggedIn && this.userService.hasEmailVerified()) {
      return true;
    } else if (this.userService.isLoggedIn && !this.userService.hasEmailVerified()) {
      return this.router.parseUrl('/verify');
    } else {
      return this.router.parseUrl('/login');
    }
  }

}
