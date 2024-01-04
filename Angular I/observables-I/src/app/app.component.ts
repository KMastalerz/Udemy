import { Component, OnDestroy, OnInit } from '@angular/core';

import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private userSrvc: UserService) {}

  ngOnInit() {
    this.activatedSub = this.userSrvc.activatedEmitter.subscribe(didActivate => {
      this.userActivated = didActivate;
    });
  }

  ngOnDestroy(): void {
    // if(this.activatedSub)
    //   this.activatedSub.unsubscribe();
  }

  activatedSub: Subscription;
  userActivated: boolean = false;
}
