import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { PlaceholderDirective } from './directives/placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    DropdownDirective,
    PlaceholderDirective,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  exports: [
    DropdownDirective,
    PlaceholderDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    CommonModule
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
