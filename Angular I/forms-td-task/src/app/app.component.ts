import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscribtionDetails = {
    email: '',
    subscription: '',
    password: ''
  }

  @ViewChild('form') signupForm: NgForm;

  onSubmit() {
    // console.log('Controls: ', this.signupForm.form.controls);
    // console.log('Form: ', this.signupForm.form);
    this.subscribtionDetails.email = this.signupForm.value.email;
    this.subscribtionDetails.subscription = this.signupForm.value.subscription;
    this.subscribtionDetails.password = this.signupForm.value.password;
    console.log(this.subscribtionDetails);
  }
}
