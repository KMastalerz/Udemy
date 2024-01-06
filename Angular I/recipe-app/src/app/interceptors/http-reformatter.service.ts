import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyHttpResponse } from '../models/http-requests.model';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpReformatterService implements HttpInterceptor {

  intercept<T>(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<MyHttpResponse<T>>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          // Transform the body of the response
          const modifiedBody: MyHttpResponse<T> = {
            response: event,
            //result has to be destructured and put back with id if id exsits in T as parameter
            result: this.restructureResponse(event.body)
          };
          // Return a new HttpResponse object with the modified body
          return event.clone({ body: modifiedBody });
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle errors
        const errorResponse: MyHttpResponse<T> = {
          error: error
        };
        throw errorResponse;
      })
    );
  }

  private restructureResponse<T>(res: HttpResponse<{[key: string]: T}>) {
    let posts: any = [];
    // console.log('Result', result);
    for(const key in res)
    {
      if (res.hasOwnProperty(key)){
        const recipe = {...res[key], id: key};
        posts.push(recipe);
      }

    }
    return posts;
  }
}
