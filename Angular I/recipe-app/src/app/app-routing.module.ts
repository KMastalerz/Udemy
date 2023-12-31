import { NgModule, inject } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { SelectRecipeComponent } from './recipes/select-recipe/select-recipe.component';
import { RecipeDetailResolverService } from './resolvers/recipe-detail-resolver.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { GetRecipesResolverService } from './resolvers/get-recipes-resolver.service';
import { AuthComponent } from './auth/auth/auth.component';

const appRoutes: Routes = [
  //{ path: '', redirectTo: '/recipes', pathMatch: 'full'},
  // { path: '', redirectTo: '/recipes'},
  { path: '', redirectTo: '/recipes' , pathMatch: 'full'},
  { path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: SelectRecipeComponent},
    {path: 'new', component: RecipeEditComponent },
    {path: ':id', component: RecipeDetailComponent, resolve: { 
      recipe: (route: ActivatedRoute) => {
        const resolverService = inject(RecipeDetailResolverService);
        const routeId = +route.params['id'];
        return resolverService.resolve(routeId);
      }}},
    {path: ':id/edit', component: RecipeEditComponent},
  ], resolve: { data: GetRecipesResolverService }},

  { path: 'shopping-list', component: ShoppingListComponent, children: [
      {path: ':id', component: ShoppingEditComponent}, 
  ]},
  { path: 'auth', component: AuthComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ], 
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
