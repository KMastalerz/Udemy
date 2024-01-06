import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { RecipeModel } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailResolverService {
  constructor(private recipeService: RecipeService, private router: Router) { }

  resolve(id: number) : Observable<RecipeModel> | Promise<RecipeModel> | RecipeModel {

    let recipe = this.recipeService.getRecipe(id);
    if(!recipe) {
      this.router.navigate(['/recipes']);
    }
    return recipe;
  }
}
