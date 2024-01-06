import { Injectable } from '@angular/core';
import { Post } from '../models/PostModel';
import { Observable, Subject, map, tap } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FirebaseGetResponse, FirebasePostResponse, MyHttpResponse } from '../models/HttpResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient){}
  error = new Subject<string>(); //we could pass next(r0)
  private url = 'https://omniplan-architect-default-rtdb.europe-west1.firebasedatabase.app/posts.json';
  
  insertPost(post: Post) {
    return this.http.post<FirebasePostResponse>(
      this.url,
      post
    ).subscribe({
      next: (res) => console.log(res),
      error: (err) => this.error.next(err.message)
    });
  }

  getPosts() {
    /* For multiple key value pairs in params 
    i have to assign as HttpParams are immutable

    */

    /* catchError with throwError can be use on map */
    let params = new HttpParams();
    params = params.append('print', 'pretty');
    params = params.append('custom', 'key');
    return this.http.get<MyHttpResponse<FirebaseGetResponse<Post>>>(this.url, { 
      headers: new HttpHeaders({'Custom-Header' : 'Hello'}),
      params: params
    }).pipe(map(response => {
      const posts: Post[] = []; 
      const result = response.result;
      // console.log('Result', result);
      for(const key in result)
      {
        if (result.hasOwnProperty(key))
          posts.push({...result[key], id: key});
      }
      return posts;
    }));
  }

  deletePosts() {
    return this.http.delete(this.url, {
      observe: 'events',
      responseType: 'json' // text or blob
    }).pipe(tap(
      event=> {
        if(event.type === HttpEventType.Sent) {
          //... we cound notify UI or something
        }

        if(event.type === HttpEventType.Response)
            console.log(event); 
      }
    ))
  }
  /*
  insertPost(post: Post) {
    return this.http.post<{name: string}>(
      'https://omniplan-architect-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      post
    ).subscribe({
      next: () => {},
      error: () => {}
    });
  }

  getPosts() {
    return this.http.get<{[key: string] : Post}>('https://omniplan-architect-default-rtdb.europe-west1.firebasedatabase.app/posts.json').pipe(map(response => {
      const posts: Post[] = []; 
      for(const key in response)
      {
        if (response.hasOwnProperty(key))
          posts.push({...response[key], id: key});
      }
      return posts;
    })).subscribe({
      next: () => {},
      error: () => {}
    });
  }

  deletePosts() {
    return this.http.delete('https://omniplan-architect-default-rtdb.europe-west1.firebasedatabase.app/posts.json').subscribe({
      next: () => {},
      error: () => {}
    });
  }
  */
}
