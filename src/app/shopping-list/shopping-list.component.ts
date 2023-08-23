import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from "../store/app.reducer";
import * as ShoppingListActions from "./store/shopping-list.actions";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>; //With NgRx
  /**
   * With Service
   ingredients: Ingredient[];
   private idChangeSub: Subscription;
  */

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {

  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList'); //With NgRx
    /**
     * With Service
     this.ingredients = this.shoppingListService.getIngredients();
     this.idChangeSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
     this.ingredients = ingredients;
     })
    */
  }

  ngOnDestroy() {
    // this.idChangeSub.unsubscribe(); //With Service
  }

  onEditItem(index: number) {
    // this.shoppingListService.startedEditing.next(index); //With Service
    this.store.dispatch(new ShoppingListActions.StartEdit(index)); //With NgRx
  }

}