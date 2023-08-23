import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import { Receipe } from "./receipe.model";
import * as fromApp from "../store/app.reducer";
import * as ReceipeActions from '../receipes/store/receipe.actions';
// import { DataStorageService } from "../shared/data-storage.service";
// import { ReceipeService } from "./receipe.service";

@Injectable({
    providedIn: 'root'
})
export class ReceipesResolverService implements Resolve<Receipe[]>{

    constructor(
        // private dataStorageService: DataStorageService,
        // private receipeService: ReceipeService,
        private store: Store<fromApp.AppState>,
        private action$: Actions
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Receipe[] | Observable<Receipe[]> | Promise<Receipe[]> {
        // const receipes = this.receipeService.getReceipes(); //With Service
        // if (receipes.length === 0) { //With Service
        // return this.dataStorageService.fetchReceipes(); //With Service
        return this.store.select('receipes').pipe( //With NgRx
            take(1),
            map(receipesState => {
                return receipesState.receipes;
            }),
            switchMap(receipes => {
                if (receipes.length === 0) {
                    this.store.dispatch(new ReceipeActions.FetchReceipes());
                    return this.action$.pipe(
                        ofType(ReceipeActions.SET_RECEIPES),
                        take(1)
                    );
                } else {
                    return of(receipes);
                }
            })
        );
        // } else { //With Service
        //     return receipes; //With Service
        // } //With Service
    }

}