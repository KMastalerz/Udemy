import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeModel } from '../../models/recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  constructor() {}
  // constructor(private recipeServices: RecipeService) {}
  @Input() recipe: RecipeModel;
  @Input() index: number;
  // @Output() recipeSelected = new EventEmitter<void>();

  // onRecpieSelect() {
  //   this.recipeServices.recipeSelected.emit(this.recipe);
  // }
}
