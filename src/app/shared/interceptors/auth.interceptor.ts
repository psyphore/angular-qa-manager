import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { SignInState } from '@root-store/sign-in-store/state';

@Injectable({ providedIn: 'root' })
export class HeaderInterceptor implements HttpInterceptor {
  @Select(SignInState.getToken) token$;
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.token$.pipe(
      switchMap(value => {
        const header =
          value && (<string>value).length !== 0
            ? req.clone({ setHeaders: { Authorization: `Bearer ${value}` } })
            : req;
        return next.handle(header);
      })
    );
  }
}
