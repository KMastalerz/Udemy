import { EventEmitter, Injectable } from '@angular/core';
import { RecipeModel } from '../models/recipe.model';
import { IngredientModel } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // recipeSelected = new Subject<RecipeModel>()
  recipesChanged = new Subject<RecipeModel[]>();

  private recipes: RecipeModel[] = [
    new RecipeModel(
      'Pizza', 
      'Classic Cheese Pizza', 
      'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*',
      [new IngredientModel('Flour', 1, 'kg'), new IngredientModel('Tomato', 5, 'qt')]),

    new RecipeModel(
      'Another Pizza', 
      'Classic Cheese Pizza', 
      'https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg',
      [new IngredientModel('Flour', 1, 'kg'), new IngredientModel('Tomato', 5, 'qt'), new IngredientModel('Cheese', 500, 'g')])
  ];

  getRecipes() {
    // slice is added to only return copy of this object
    return this.recipes.slice();
  }

  getRecipe(id: number) : RecipeModel {
    // return this.recipes.find(rec=> rec.id === id);
    // do it by index
    return this.recipes.slice()[id];
  }

  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: RecipeModel) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  } 
}
