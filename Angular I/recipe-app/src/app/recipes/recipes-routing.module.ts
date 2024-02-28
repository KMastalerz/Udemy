import { NgModule, inject } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { UserLoggedIn } from '../auth/auth/auth-guard';
import { RecipesComponent } from './recipes.component';
import { SelectRecipeComponent } from './select-recipe/select-recipe.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeDetailResolverService } from './resolvers/recipe-detail-resolver.service';
import { GetRecipesResolverService } from './resolvers/get-recipes-resolver.service';

const routes: Routes = [
  { path: '', 
  canActivate: [UserLoggedIn],
  component: RecipesComponent, children: [
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
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule { }
