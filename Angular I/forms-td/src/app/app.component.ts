import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // toggleDisable(): void {
  //   if(this.signupForm.form.disabled) {
  //     this.signupForm.form.enable();
  //   } else this.signupForm.form.disable();
    
  // }

  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    anwser: '',
    gender: '',
  }

  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';

    //This will override all data
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: suggestedName + '@test.com',
    //   },
    //   secret: 'teacher',
    //   questionAnswer: '',
    //   gender: 'female'
    // });


    //override parts of the form
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  @ViewChild('f') signupForm: NgForm;
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    // console.log(this.signupForm);
    this.submitted = true;
    console.log(this.signupForm.form.value);
    this.user.username = this.signupForm.form.value.userData.username;
    this.user.email = this.signupForm.form.value.userData.email;
    this.user.secretQuestion = this.signupForm.form.value.secret;
    this.user.anwser = this.signupForm.form.value.questionAnwser;
    this.user.gender = this.signupForm.form.value.gender;

    this.signupForm.reset();
  }
}
