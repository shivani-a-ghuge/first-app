import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { map, tap } from "rxjs/operators";
import { Receipe } from "../receipes/receipe.model";
import * as fromApp from "../store/app.reducer";
import * as ReceipesActions from "../receipes/store/receipe.actions";
// import { ReceipeService } from "../receipes/receipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(
        private http: HttpClient,
        // private receipeService: ReceipeService,
        private store: Store<fromApp.AppState>
    ) { }

    // With Service
    // storeReceipes() {
    //     const receipes = this.receipeService.getReceipes();
    //     this.http.put(
    //         'https://angular-receipe-book-e6e55-default-rtdb.firebaseio.com/receipes.json',
    //         receipes
    //     ).subscribe(response => {
    //         console.log(response);
    //     });
    // }

    // With Service
    // fetchReceipes() {
    //     return this.http.get<Receipe[]>(
    //         'https://angular-receipe-book-e6e55-default-rtdb.firebaseio.com/receipes.json'
    //     ).pipe(
    //         map(receipes => {
    //             return receipes.map(receipe => {
    //                 return { ...receipe, ingredients: receipe.ingredients ? receipe.ingredients : [] };
    //             });
    //         }),
    //         tap(receipes => {
    //             this.receipeService.setReceipes(receipes);
    //         })
    //     );
    // }
}