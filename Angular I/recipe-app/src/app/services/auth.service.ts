import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

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

  constructor(private http: HttpClient) { }
  private signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZoYhD_ZeAm-iaHnta0G8fI2CjOB4lNXc';
  private loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZoYhD_ZeAm-iaHnta0G8fI2CjOB4lNXc'

  signup(signData: AuthSignupData) {
    return this.http.post<AuthResponseData>(this.signupUrl, signData).pipe(catchError(this.handleError));
  }

  login(signData: AuthSignupData) {
    return this.http.post<AuthResponseData>(this.loginUrl, signData).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
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
