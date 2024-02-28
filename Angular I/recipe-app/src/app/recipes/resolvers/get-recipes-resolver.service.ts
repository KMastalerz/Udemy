import { Injectable } from '@angular/core';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { RecipeService } from '../recipe.service';

@Injectable({
  providedIn: 'root'
})
export class GetRecipesResolverService {
  constructor(private dataService: DataStorageService) { }

  resolve() : void {
    this.dataService.getRecipes().subscribe();
  }
}
