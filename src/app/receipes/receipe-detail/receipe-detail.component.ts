import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from "@ngrx/store";
import { map, switchMap } from 'rxjs/operators';
import { Receipe } from '../receipe.model';
import * as fromApp from "../../store/app.reducer";
import * as ReceipeActions from "../store/receipe.actions";
import *as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
// import { ReceipeService } from '../receipe.service';

@Component({
  selector: 'app-receipe-detail',
  templateUrl: './receipe-detail.component.html',
  styleUrls: ['./receipe-detail.component.css']
})
export class ReceipeDetailComponent implements OnInit {

  receipe: Receipe;
  id: number;

  constructor(
    // private receipeService: ReceipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    /**
     * With Service
     this.route.params.subscribe((params: Params) => {
     this.id = +params['id'];
     this.receipe = this.receipeService.getReceipe(this.id);
     })
    */
    /**
     * With NgRx
    */
    this.route.params.pipe(
      map(params => {
        return +params['id'];
      }),
      switchMap(id => {
        this.id = id;
        return this.store.select('receipes');
      }),
      map(receipesState => {
        return receipesState.receipes.find((receipe, index) => {
          return index === this.id;
        });
      })
    ).subscribe(receipe => {
      this.receipe = receipe;
    });
  }

  onAddToShoppingList() {
    // this.receipeService.addIngredientsToShoppingList(this.receipe.ingredients); //With Service
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.receipe.ingredients)); //With NgRx
  }

  onEditReceipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteReceipe() {
    // this.receipeService.deleteReceipe(this.id); //With Service
    this.store.dispatch(new ReceipeActions.DeleteReceipe(this.id)); //With NgRx
    this.router.navigate(['/receipes']);
  }

}