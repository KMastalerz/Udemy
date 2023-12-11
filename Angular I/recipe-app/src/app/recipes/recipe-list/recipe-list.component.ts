import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeModel } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  @Output() recipeSelected = new EventEmitter<RecipeModel>();

  recipes: RecipeModel[] = [
    new RecipeModel('Pizza', 'Classic Cheese Pizza', 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*'),
    new RecipeModel('Another Pizza', 'Classic Cheese Pizza', 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*')
  ];

  onRecipeSelected(recipe: RecipeModel) {
    this.recipeSelected.emit(recipe);
  }

}
