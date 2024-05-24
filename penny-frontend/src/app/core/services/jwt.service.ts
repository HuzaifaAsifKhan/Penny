import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {
  // GET
  getToken() {
    return localStorage.getItem('jwtToken');
  }
  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '');
  }
  // Save
  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }
  saveUser(user: any): any {
    localStorage.setItem('user', JSON.stringify(user));
  }

  destroy() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
  }
}
