import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { RecipeModel } from '../../models/recipe.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  constructor(private shoppingListServices: ShoppingListService, private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.recipe = data['recipe'];
      }
    );

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    )

    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.id = + params['id'];
    //   }
    // )
  }

  id: number;
  recipe: RecipeModel;
  // @Input() recipe: RecipeModel;

  onSend() {
    this.shoppingListServices.addIngredients(this.recipe.ingredients); 
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../']);
  }

  // onRecipeEdit() {
  //   this.router.navigate(['edit'], {relativeTo: this.route});
  //   // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  // }
}
