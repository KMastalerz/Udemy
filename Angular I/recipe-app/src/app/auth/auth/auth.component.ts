import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService, AuthSignupData } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error:string = null;

  constructor(private authService: AuthService){}

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
        console.log(res);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;      
        console.log(err);   
        this.isLoading = false;
      }
    })

    form.reset();
  }
}
