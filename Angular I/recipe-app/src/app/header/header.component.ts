import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // //@Output() featureSelected = new EventEmitter<string>();
  // constructor(private router: Router) {}

  // onSelect(feature: string) {
  //   // this.featureSelected.emit(feature);
  //   this.router.navigate([`/${feature}`]);
  // }
}
