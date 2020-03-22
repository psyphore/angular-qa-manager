import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { SignInStoreState } from '@root-store/sign-in-store';

@Injectable({ providedIn: 'root' })
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private store$: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.getToken().pipe(
      switchMap(value => {
        const header =
          value && value.length !== 0
            ? req.clone({ setHeaders: { Authorization: `Bearer ${value}` } })
            : req;
        return next.handle(header);
      })
    );
  }

  getToken() {
    return new Observable<string>(s =>
      s.next(this.store$.selectSnapshot(SignInStoreState.SignInState.getToken))
    );
  }
}
