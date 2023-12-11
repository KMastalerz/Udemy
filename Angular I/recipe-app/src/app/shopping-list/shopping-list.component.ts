import { Component } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {

  ingredients: IngredientModel[] = [
    new IngredientModel('Flour', 1, 'kg'),
    new IngredientModel('Cheese', 400, 'g'),
  ];

  clearList() {
    this.ingredients = [];
  }

  onIngredientAdded(ingredient: IngredientModel) {
    this.ingredients.push(ingredient)
  }
}
