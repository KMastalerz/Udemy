import { Component, OnDestroy, OnInit } from '@angular/core';
import { IngredientModel } from '../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StringService } from '../../format-services/string.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private shoppingListServices: ShoppingListService) {}


  ngOnInit(): void {
    this.units = this.shoppingListServices.units;

    // add form 
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(1000)]),
      'unit': new FormControl(null, [Validators.required])
    })

    //subscribe to update values live
    this.valSub = this.form.valueChanges.subscribe(val=> {
      this.name = val.name;
      this.amount = val.amount;
      this.unit = val.unit;
    });

    this.selIngSub = this.shoppingListServices.selectedIngredient.subscribe((index: number) => {
      this.editMode = true;
      this.editIndex = index;
      this.editItem = this.shoppingListServices.getIngredient(index);

      this.form.setValue({
        'name' : this.editItem.name,
        'amount' : this.editItem.amount,
        'unit' : this.editItem.unit
      });
    });
  }

  ngOnDestroy(): void {
    if(this.valSub) this.valSub.unsubscribe();
    if(this.selIngSub) this.selIngSub.unsubscribe();
  }

  // @Output() ingredientAdded = new EventEmitter<IngredientModel>();
  // @Output() clearClicked = new EventEmitter<void>();

  // @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;
  form: FormGroup;
  units: string[];
  valSub: Subscription;
  selIngSub: Subscription;
  canClear: boolean = false;
  editMode: boolean = false;
  editIndex: number;
  editItem: IngredientModel;

  name: string; 
  amount: number;
  unit: string;

  onSubmit() {
    // this.ingredientAdded.emit(new IngredientModel(this.nameInputRef.nativeElement.value, +this.amountInputRef.nativeElement.value, 'kg'))
    if(this.editMode) {
      this.shoppingListServices.updateIngredient(this.editIndex, new IngredientModel(this.name, this.amount, this.unit));
      
    } else {
      this.shoppingListServices.addIngredient(new IngredientModel(this.name, this.amount, this.unit));
    }
    this.reset();
  }


  onDelete() {
    this.shoppingListServices.deleteIngredient(this.editIndex);
    this.reset();
  }

  onClear() {
    this.reset();
  }

  reset() {
    this.form.reset();
    this.editMode = false;
    this.editIndex = null;
    this.editItem = null;
  }
}
