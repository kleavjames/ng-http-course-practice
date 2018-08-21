import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`AddHeaderInterceptor: ${req.url} `);

    const jsonReq: HttpRequest<any> = req.clone({
      setHeaders: { 'Content-Type': 'application/json' }
    });

    return next.handle(jsonReq);
      // .pipe(
      //   tap(event => {
      //     if (event.type === HttpEventType.Response) {
      //       console.log(event.body)
      //     }
      //   })
      // );
  }
}
