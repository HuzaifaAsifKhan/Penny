import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private router: Router) {}

  private formatErrors = (error: any) => {
    if ([401, 403].indexOf(error.status) !== -1) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      this.router.navigateByUrl('/auth/login');
    }
    return throwError(() => error.error.message || error.error);
  };

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  post(
    path: string,
    body: Object = {},
    params: HttpParams | any = new HttpParams()
  ): Observable<any> {
    return this.http
      .post(`${path}`, JSON.stringify(body), { params })
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${path}`).pipe(catchError(this.formatErrors));
  }

  filterToParam(filter: any) {
    const params: any = {};
    filter
      ? Object.keys(filter).forEach((key) => {
          params[key] = filter[key];
        })
      : '';

    return params;
  }
}
