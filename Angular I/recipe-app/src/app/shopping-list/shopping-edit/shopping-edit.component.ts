import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { IngredientModel } from '../../models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {

  @Output() ingredientAdded = new EventEmitter<IngredientModel>();
  @Output() clearClicked = new EventEmitter<void>();

  @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;

 

  onAdd() {
      this.ingredientAdded.emit(new IngredientModel(this.nameInputRef.nativeElement.value, +this.amountInputRef.nativeElement.value, 'kg'))
  }

  onDelete() {
    
  }

  onClear() {
    console.log('ClearClicked!');
    this.clearClicked.emit();
  }

}
