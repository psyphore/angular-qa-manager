import { AuthService } from '@services/security.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.getToken().pipe(
      switchMap(value => {
        const header =
          value && value.length !== 0
            ? req.clone({ setHeaders: { Authorization: value } })
            : req;
        return next.handle(header);
      })
    );
  }

  getToken() {
    return new Observable<string>(s =>
      s.next(this.auth.getAuthorizationHeader())
    );
  }

  getTokenAsync() {
    return this.auth.getAuthorizationHeaderAsync();
  }
}
