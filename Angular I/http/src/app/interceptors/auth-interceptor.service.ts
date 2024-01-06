import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = req.clone(
      { 
        headers: req.headers.append('Auth', 'Test_Header'), 
      });
    /* with handle i can do something with my sesponse */
    // return next.handle(modifiedRequest).pipe(tap(
    //   event => {
    //     console.log(event);
    //     if(event.type === HttpEventType.Response) {
    //       console.log('Response arrived, body data: ');
    //       console.log(event.body);
    //     }
    //   }
    // ));

    return next.handle(modifiedRequest);
  }
}
