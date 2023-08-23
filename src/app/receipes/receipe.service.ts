import { Injectable } from "@angular/core";
import { Receipe } from "./receipe.model";
import { Ingredient } from "../shared/ingredient.model";
// import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class ReceipeService {

    receipesChanged = new Subject<Receipe[]>();

    // private receipes: Receipe[] = [
    //     new Receipe(
    //         'Vegetable Heart Receipe',
    //         'A recipe is a set of instructions that describes how to prepare or make something, especially a dish of prepared food. A sub-recipe or subrecipe is a recipe for an ingredient that will be called for in the instructions for the main recipe.',
    //         'https://thumbs.dreamstime.com/b/heart-shape-various-vegetables-fruits-healthy-food-concept-isolated-white-background-140287808.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20)
    //         ]
    //     ),
    //     new Receipe(
    //         'Egg Veggie',
    //         'A recipe is a formula of ingredients and a list of instructions for creating prepared foods. It is used to control quality, quantity, and food costs in a foodservice operation. A recipe may be simple to complex based on the requirements of the operation and the intended user.',
    //         'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Bread', 3)
    //         ]
    //     )
    // ];

    private receipes: Receipe[] = [];

    constructor(
        // private shoppingListService: ShoppingListService,
        private store: Store<fromApp.AppState>
    ) {

    }

    setReceipes(receipes: Receipe[]) {
        this.receipes = receipes;
        this.receipesChanged.next(this.receipes.slice());
    }

    getReceipes() {
        return this.receipes.slice();
    }

    getReceipe(index: number) {
        return this.receipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        // this.shoppingListService.addIngredients(ingredients); //With Service
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients)); //With NgRx
    }

    addReceipe(receipe: Receipe) {
        this.receipes.push(receipe);
        this.receipesChanged.next(this.receipes.slice());
    }

    updateReceipe(index: number, newReceipe: Receipe) {
        this.receipes[index] = newReceipe;
        this.receipesChanged.next(this.receipes.slice());
    }

    deleteReceipe(index: number) {
        this.receipes.splice(index, 1);
        this.receipesChanged.next(this.receipes.slice());
    }

}