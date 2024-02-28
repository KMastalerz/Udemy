import { EventEmitter, Injectable } from '@angular/core';
import { IngredientModel } from '../shared/models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor() { }

  ingredientsChanged = new Subject<IngredientModel[]>();
  selectedIngredient = new Subject<number>();

  units: string[] = ['kg', 'g', 'dag', 'pcs', 'l', 'ml', 'qt'];

  private ingredients: IngredientModel[] = [
    new IngredientModel('Flour', 1, 'kg'),
    new IngredientModel('Cheese', 400, 'g'),
  ];

  getIngredient(index: number) {
    return this.ingredients.slice()[index];
  }

  getIngredients() {
    // return this.ingredients;
    return this.ingredients.slice();
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: IngredientModel) {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(newIngredients: IngredientModel[]) {
    this.ingredients.push(...newIngredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
