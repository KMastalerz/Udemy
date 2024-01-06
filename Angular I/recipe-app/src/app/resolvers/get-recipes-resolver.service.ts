import { Injectable } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { RecipeService } from '../services/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class GetRecipesResolverService {
  constructor(private dataService: DataStorageService) { }

  resolve() : void {
    console.log('getting recipes');
    this.dataService.getRecipes().subscribe();
  }
}
