import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../../recipes/recipe.service';
import { RecipeModel } from '../../recipes/models/recipe.model';
import { Observable, exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../../auth/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService){}
  private url: string = 'https://recipe-app-b8a30-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  getRecipes() : Observable<RecipeModel[]> {

    //gets only one emit and unsubscribes. 

    return this.http.get<RecipeModel[]>(this.url).pipe(
        map(res=> {
          return res.map(res => {
            return {...res, ingredients: res.ingredients ? res.ingredients : []}
          });
        }), 
        tap(res => {
          this.recipeService.setRecipes(res)
        })
      );
  }

  updateRecipes() {
    this.http.put(this.url, this.recipeService.getRecipes()).subscribe();
  } 
}
