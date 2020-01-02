import { AuthService } from '@services/security.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, flatMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.getAuthorizationHeaderAsync().pipe(
      first(),
      flatMap(token => {
        const headers =
          token && token.length !== 0
            ? req.clone({
                setHeaders: { Authorization: token }
              })
            : req;
        return next.handle(headers);
      })
    );
  }
}
