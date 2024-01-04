import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { RecipeModel } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailResolverService implements Resolve<RecipeModel> {
  constructor(private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<RecipeModel> | Promise<RecipeModel> | RecipeModel {
    return this.recipeService.getRecipe(+route.params['id']);
  }
}
