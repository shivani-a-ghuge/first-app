import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from "./../store/shopping-list.actions";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  // edittedItemIndex: number; //With Service
  edittedItem: Ingredient;

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {

  }

  ngOnInit() {
    /**
     * With NgRx
     */
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.edittedIngredientIndex > -1) {
        this.editMode = true;
        this.edittedItem = stateData.edittedIngredient;
        this.shoppingListForm.setValue({
          name: this.edittedItem.name,
          amount: this.edittedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
    /**
     * With Service
       this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
       this.edittedItemIndex = index;
       this.editMode = true;
       this.edittedItem = this.shoppingListService.getIngredient(index);
       this.shoppingListForm.setValue({
       name: this.edittedItem.name,
       amount: this.edittedItem.amount
       });
       });
    */

  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.edittedItemIndex, newIngredient); //With Service
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient)); //With NgRx
    } else {
      // this.shoppingListService.addIngredient(newIngredient); //With Service
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient)); //With NgRx
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit()); //With NgRx
  }

  onDelete() {
    // this.shoppingListService.deleteIngredients(this.edittedItemIndex); //With Service
    this.store.dispatch(new ShoppingListActions.DeleteIngredient()); //With NgRx
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit()); //With NgRx
  }

}
