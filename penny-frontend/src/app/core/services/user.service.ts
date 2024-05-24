import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<any>({} as any);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  populate() {
    // If JWT detected, attempt to get & store user's info
    if (
      this.jwtService.getToken() &&
      typeof this.jwtService.getToken !== 'undefined'
    ) {
      this.setAuth(this.jwtService.getUser());
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  attemptAuth(type: any, credentials: any): Observable<any> {
    const route = type === 'signin' ? '/signin' : 'signup';

    return this.apiService
      .post(
        `${environment.api_url}/auth/${type}`,
        (({ username, password }) => ({ username, password }))(credentials)
      )
      .pipe(
        map((data) => {
          this.setAuth(data);
          return data;
        })
      );
  }

  setAuth(user: any) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    this.jwtService.saveUser(user);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroy();
    // Set current user to an empty object
    this.currentUserSubject.next({} as any);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }
}
