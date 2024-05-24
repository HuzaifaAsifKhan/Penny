import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import {
  ApiService,
  AuthGuard,
  NoAuthGuard,
  JwtService,
  UserService,
} from './services';
import { ShowAuthedDirective } from './directives/show-authed.directive';

@NgModule({
  declarations: [ShowAuthedDirective],
  imports: [CommonModule],
  exports: [ShowAuthedDirective],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    NoAuthGuard,
    AuthGuard,
    ApiService,
    JwtService,
    UserService,
  ],
})
export class CoreModule {}
