import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface AuthSignupData {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }
  private signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZoYhD_ZeAm-iaHnta0G8fI2CjOB4lNXc';
  private loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZoYhD_ZeAm-iaHnta0G8fI2CjOB4lNXc'

  signup(signData: AuthSignupData) {
    return this.http.post<AuthResponseData>(this.signupUrl, signData).pipe(catchError(this.handleError), tap(resData=> { 
      this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)}));
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData) return;

    const loadedData = new User (userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedData.token){
      this.user.next(loadedData);
      const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expDuration);
    }
    else this.router.navigate(['/auth']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      // this.logout()
    }, expirationDuration);//expirationDuration
  }

  login(signData: AuthSignupData) {
    return this.http.post<AuthResponseData>(this.loginUrl, signData).pipe(catchError(this.handleError), tap(resData=> this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  private handleAuth(email: string, userID: string, token: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userID, token, expDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.error('Error', errorResponse);
    let errorMssg = 'An unknown error occured!';
    if(!errorResponse.error || !errorResponse.error.error) return throwError(() => new Error(errorMssg));
    switch(errorResponse.error.error.message) {
      case 'EMAIL_EXISTS': 
        errorMssg = 'There email already exists. Try to login.'
        break;
      case 'EMAIL_NOT_FOUND': 
        errorMssg = 'There is no user record corresponding to this identifier. The user may have been deleted.'
        break;
      case 'INVALID_PASSWORD': 
        errorMssg = 'The password is invalid or the user does not have a password.'
        break;
      case 'USER_DISABLED': 
        errorMssg = 'The user account has been disabled by an administrator.'
        break;
      case 'INVALID_LOGIN_CREDENTIALS': 
        errorMssg = 'Invalid credentials, try again.'
        break;
      default: 
        errorMssg = `Exited with error code: ${errorResponse.error.error.message}`
    }

    return throwError(() => new Error(errorMssg));
  }
}
