import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { MyHttpResponse } from '../models/HttpResponseModel';

@Injectable({
  providedIn: 'root'
})
export class LoggingInterceptorService implements HttpInterceptor {
  intercept<T>(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<MyHttpResponse<T>>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          // Transform the body of the response
          const modifiedBody: MyHttpResponse<T> = {
            result: event.body,
            error: undefined
          };
          // Return a new HttpResponse object with the modified body
          return event.clone({ body: modifiedBody });
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle errors
        const errorResponse: MyHttpResponse<T> = {
          result: undefined,
          error: error
        };
        throw errorResponse;
      })
    );
  }
}
