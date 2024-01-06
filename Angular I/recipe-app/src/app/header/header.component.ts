import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private dataService: DataStorageService){}

  onSaveData() {
    this.dataService.updateRecipes();
  }

  onFetchData() {
    this.dataService.getRecipes().subscribe();
  }
  // //@Output() featureSelected = new EventEmitter<string>();
  // constructor(private router: Router) {}

  // onSelect(feature: string) {
  //   // this.featureSelected.emit(feature);
  //   this.router.navigate([`/${feature}`]);
  // }
}
