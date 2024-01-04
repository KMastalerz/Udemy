import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormControlStatus, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor() { }


  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.projectNameValidator.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(null, [Validators.required])
    });

    this.statusSub = this.signupForm.statusChanges.subscribe((status: FormControlStatus)=> {
      if(status === 'VALID') {
        this.canSubmit = true;
      } else {
        this.canSubmit = false;
      } 
    })
  }

  ngOnDestroy(): void {
    if(this.statusSub)
      this.statusSub.unsubscribe();
  }

  signupForm: FormGroup; 
  statuses: string[] = ['Stable', 'Critical', 'Finished'];
  canSubmit: boolean = false;
  forbiddenProjectNames: string[] = ['test', 'dummy', 'query'];
  statusSub: Subscription;

  onSubmit() {
    console.log(this.signupForm.value);
    this.signupForm.reset();
  }

  projectNameValidator(control: FormControl) : ValidationErrors {
    const value = control.value;

    if(!value) return null;

    if(this.forbiddenProjectNames.indexOf(value.toLowerCase()) !== -1)
    {
        return {'projectNameForbidden': true};
    }

    return null;
  }
}
