import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes' , pathMatch: 'full'},
  // { path: 'recipes', loadChildren: './recipes/recipes.module.ts#RecipesModule'}
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then((mod) => mod.RecipesModule)},
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m=> m.ShoppingListModule)}
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
