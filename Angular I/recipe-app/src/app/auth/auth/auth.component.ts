import { Component, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService, AuthSignupData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceholderDirective } from '../../shared/directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error:string = null;

  private closeSubscription: Subscription | undefined;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(private authService: AuthService, private router: Router, private viewContainerRef: ViewContainerRef){}

  ngOnDestroy() {
    if(this.closeSubscription) {
      this.closeSubscription.unsubscribe();
      this.closeSubscription = undefined;
    }
  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if(!form.valid) return;

    let auth: AuthSignupData = {
      email: form.value['email'],
      password: form.value['password'],
      returnSecureToken: true
    }

    let authObs: Observable<AuthResponseData>; 

    if(this.isLoginMode) {
      authObs = this.authService.login(auth);
    } else {
      authObs = this.authService.signup(auth);
    }

    authObs.subscribe({
      next: (res) => {
        if(this.error) this.error = null;
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      error: (err) => {
        this.error = err.message;   
        this.showErrorAlert(err.message);   
        this.isLoading = false;
      }
    })

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(errorMessage: string) {
    this.alertHost.viewContainerRef.clear();
    const alertRef = this.alertHost.viewContainerRef.createComponent(AlertComponent);
    alertRef.instance.message =  errorMessage;

    this.closeSubscription = alertRef.instance.close.subscribe(()=> {
      this.closeSubscription.unsubscribe(); 

      this.alertHost.viewContainerRef.clear();
    });
  }
}
