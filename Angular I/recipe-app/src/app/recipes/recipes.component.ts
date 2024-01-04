import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {

  constructor(private recipeServices: RecipeService) {}

  ngOnInit(): void {
    // this.recipeServices.recipeSelected.subscribe(
    //   (recipe: RecipeModel) => {
    //     this.selectedRecipe = recipe;
    //   }
    // );
  }

  //@Input() selectedRecipe: RecipeModel;
}
