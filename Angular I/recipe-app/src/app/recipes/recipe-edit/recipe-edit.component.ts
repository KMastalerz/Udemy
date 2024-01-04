import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { RecipeModel } from '../../models/recipe.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { IngredientModel } from '../../models/ingredient.model';
import { Subscription } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit, OnDestroy  {

  constructor(private route: ActivatedRoute, private shoppingListServices: ShoppingListService, private recipeService: RecipeService, private router: Router) {}
  
  id: number;
  editMode: boolean = false;

  ngOnInit(): void {
    //load possible units
    this.units = this.shoppingListServices.units;

    //subscribe to selected data
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        //check if recipe is an edit
        this.editMode = params['id'] != null;
      }
    );

    this.initForm();
  }
  
  ngOnDestroy(): void {
    if(this.recipeSub) this.recipeSub.unsubscribe(); 
  }

  private initForm() {
    let name = '';
    let description = '';
    let imgUrl = '';
    let ingredients = new FormArray([]);

    if(this.editMode) {
      let recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      description = recipe.description;
      imgUrl = recipe.imageUrl;

      if(recipe.ingredients){
        for(let ingredient of recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, [Validators.required]),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1), Validators.max(1000)]),
              'unit': new FormControl(ingredient.unit, [Validators.required]),
            })
          )
        }
      }
    }

    //initialize form 
    this.form = new FormGroup({
      'name': new FormControl(name, [Validators.required]),
      'description': new FormControl(description, [Validators.required]),
      'imageUrl': new FormControl(imgUrl, [Validators.required]),
      'ingredients': ingredients
    })
  }

  form: FormGroup;
  units: string[];
  lockUpdateEdit: boolean = false;
  recipeSub: Subscription;

  onSubmit() {
    // const recipe: RecipeModel = new RecipeModel(
    //   this.form.value['name'],
    //   this.form.value['description'],
    //   this.form.value['imageUrl'],
    //   this.form.value['ingredients']
    // ); 

    if(this.editMode)
      this.recipeService.updateRecipe(this.id, this.form.value);
    else 
      this.recipeService.addRecipe(this.form.value);


    this.initForm();
    this.navigateBack();
  }

  onAddIngredient(copy?: IngredientModel) {
    const control = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(1000)]),
      'unit': new FormControl(null, [Validators.required])
    });
    (<FormArray>this.form.get('ingredients')).push(control);
  }

  onRemoveIngredient(index: number) {
    //remove element from form array
    const ingredientsArray = <FormArray>this.form.get('ingredients');
    if (ingredientsArray != null) {
        ingredientsArray.removeAt(index);
    }
  }

  onCancel() {
    this.initForm();
    this.navigateBack();
  }

  navigateBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  get ingredients() {
    return (<FormArray>this.form.get('ingredients')).controls;
    // return (this.signupForm.get('ingredients') as FormArray).controls;
  }
}
