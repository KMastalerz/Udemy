import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { RecipeModel } from '../models/recipe.model';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService){}
  private url: string = 'https://recipe-app-b8a30-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  getRecipes() : Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(this.url).pipe(map(res=> {
      return res.map(res => {
        return {...res, ingredients: res.ingredients ? res.ingredients : []}
      });
    }), tap(res => {
      console.log('downloaded recipes', res);
      this.recipeService.setRecipes(res)
    }));
    
    // .subscribe(res => {
    //   this.recipeService.setRecipes(res);
    // });
  }

  updateRecipes() {
    this.http.put(this.url, this.recipeService.getRecipes()).subscribe();
  } 
}
