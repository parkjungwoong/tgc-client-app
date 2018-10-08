import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class apiCallInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /*const authReq = req.clone({
      headers: req.headers.set('Content-Type','application/json;charset=UTF-8')
    });*/

    const authReq = req.clone();

    return next.handle(authReq);
  }
}
