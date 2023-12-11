import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeModel } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() recipe: RecipeModel;

  @Output() recipeSelected = new EventEmitter<void>();

  onRecpieSelect() {
    this.recipeSelected.emit();
  }
}
