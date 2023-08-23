import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ReceipesActions from './receipe.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Receipe } from '../receipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";

@Injectable()
export class ReceipeEffects {

    storeReceipes = createEffect(() => this.action$.pipe(
        ofType(ReceipesActions.STORE_RECEIPES),
        withLatestFrom(this.store.select('receipes')),
        switchMap(([actionData, receipesState]) => {
            return this.http.put(
                'https://angular-receipe-book-e6e55-default-rtdb.firebaseio.com/receipes.json',
                receipesState.receipes
            )
        })),
        { dispatch: false }
    );

    fetchReceipes = createEffect(() => this.action$.pipe(
        ofType(ReceipesActions.FETCH_RECEIPES),
        switchMap(() => {
            return this.http.get<Receipe[]>(
                'https://angular-receipe-book-e6e55-default-rtdb.firebaseio.com/receipes.json'
            )
        }),
        map(receipes => {
            return receipes.map(receipe => {
                return {
                    ...receipe,
                    ingredients: receipe.ingredients ? receipe.ingredients : []
                }
            })
        }),
        map(receipes => {
            return new ReceipesActions.SetReceipes(receipes);
        })
    ));

    constructor(
        private action$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) { }
}