import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/services/data-storage.service';
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataService: DataStorageService, private authService: AuthService){}

  isAuthenticated: boolean = false;
  private userSub: Subscription;

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user=> {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    if(this.userSub)
      this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataService.updateRecipes();
  }

  onFetchData() {
    this.dataService.getRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
