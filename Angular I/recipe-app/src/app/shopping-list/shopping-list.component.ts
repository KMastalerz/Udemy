import { Component, OnDestroy, OnInit } from '@angular/core';
import { IngredientModel } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  constructor(private shoppingListServices: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListServices.getIngredients();
    this.igChangeSub = this.shoppingListServices.ingredientsChanged.subscribe(
      (ingredients: IngredientModel[])=> {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    if(this.igChangeSub)
      this.igChangeSub.unsubscribe();
  }

  ingredients: IngredientModel[];
  private igChangeSub: Subscription;

  onEditItem(index: number) {
    this.shoppingListServices.selectedIngredient.next(index);
  }
  // clearList() {
  //   this.ingredients = [];
  // }

  // onIngredientAdded(ingredient: IngredientModel) {
  //   this.ingredients.push(ingredient)
  // }
  
}
