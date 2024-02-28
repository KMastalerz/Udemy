import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from './models/recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}
