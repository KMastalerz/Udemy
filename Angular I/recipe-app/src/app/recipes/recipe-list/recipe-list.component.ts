import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeModel } from '../models/recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy{

  constructor(private recipeServices: RecipeService) {}

  ngOnInit() {
    this.recipeSub = this.recipeServices.recipesChanged.subscribe(value=> {
      this.recipes = value;
    })

    this.recipes = this.recipeServices.getRecipes();
  }

  ngOnDestroy() {
    if(this.recipeSub) this.recipeSub.unsubscribe();
  }

  recipes: RecipeModel[];
  recipeSub: Subscription;
}
