import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.signupForm = new FormGroup({ 
      'userData' : new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNamesValidator.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email],
        this.forbiddenEmailsValidator.bind(this)),
      }),
      'gender': new FormControl('Male'),
      'hobbies': new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value);
    //   }
    // );
    // this.signupForm.statusChanges.subscribe(
    //   (value) => {
    //     console.log(value);
    //   }
    // );

    // this.signupForm.setValue({
    //   'userData' : {
    //     'username': 'Max',
    //     'email': 'max@test.com',
    //   },
    //   'gender' : 'male',
    //   'hobbies' : []
    // });

    // this.signupForm.patchValue({
    //   'userData' : {
    //     'username': 'Max'
    //   }
    // });

    // this.signupForm.patchValue(this.resetValue);
    this.signupForm.setValue(this.resetValue);
  }

  genders = ['Male', 'Female'];
  signupForm: FormGroup;
  forbiddenNames = ['chris', 'anna'];
  forbiddenEmails = ['chris@gmail.com', 'anna@gmail.com'];

  private resetValue = {
      'userData' : {
        'username': 'Max',
        'email': '',
      },
      'gender' : 'Male',
      'hobbies' : []
    };

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset(this.resetValue);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }

  get controls() {
    // return this.signupForm.get('hobbies');
    return (<FormArray>this.signupForm.get('hobbies')).controls;
    // return (this.signupForm.get('hobbies') as FormArray).controls;
  }
  
  //{[s: string]: boolean}
  forbiddenNamesValidator(control: FormControl) : ValidationErrors {
    let value: string = control.value;
    if(!value) return null;
    if(this.forbiddenNames.indexOf(value.toLowerCase()) !== -1)
    {
        return {'nameIsForbidden': true};
    }

    //return null if valid!!!!!
    return null;
  }

  forbiddenEmailsValidator(control: FormControl) : Promise<any> | Observable<any> {
    let value: string = control.value; 
    if(!value) return null;
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(()=> {
        if(this.forbiddenEmails.indexOf(value.toLowerCase()) !== -1)
        {
            resolve({'emailIsForbidden': true});
        } else {
            resolve(null);
        }
      }, 1500);
    });

    return promise;
  }
}
