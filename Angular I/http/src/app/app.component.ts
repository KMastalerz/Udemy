import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, map } from 'rxjs';
import { Post } from './models/PostModel';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error = null;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.insertPost(postData)
    this.fetchPosts();
  }

  onFetchPosts() {
    // Send Http request
   this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(res=> {
      this.fetchPosts();
    });
  }

  private fetchPosts() {
    this.isFetching = true;
    // this.postService.getPosts().subscribe(posts=> {
    //   this.isFetching = false;
    //   this.loadedPosts = posts;
    // }, error => {
    //   this.isFetching = false;
    //   this.error = error.message;
    // });
    this.postService.getPosts().subscribe({
      next: (res) => this.loadedPosts = res,
      error: (error) => {
        console.log(error);
        this.error = error.message;
        this.isFetching = false
      },
      complete: () => this.isFetching = false,
    });
  }
}
