import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { UserService, JwtService } from '.';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | any {
    this.userService.isAuthenticated.subscribe((isAuth: any) => {
      if (!isAuth) {
        return true;
      }
      this.router.navigateByUrl('/');
      return false;
    });
  }
}
