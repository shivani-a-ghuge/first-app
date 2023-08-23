import { Action } from "@ngrx/store";
import { Receipe } from "../receipe.model";

export const SET_RECEIPES = '[Receipes] Set Receipes';
export const STORE_RECEIPES = '[Receipes] Store Receipes';
export const FETCH_RECEIPES = '[Receipes] Fetch Receipes';
export const ADD_RECEIPE = '[Receipe] Add Receipe';
export const UPDATE_RECEIPE = '[Receipe] Update Receipe';
export const DELETE_RECEIPE = '[Receipe] Delete Receipe';

export class SetReceipes implements Action {
    readonly type = SET_RECEIPES;
    constructor(public payload: Receipe[]) { }
}

export class StoreReceipes implements Action {
    readonly type = STORE_RECEIPES;
}

export class FetchReceipes implements Action {
    readonly type = FETCH_RECEIPES;
}

export class AddReceipe implements Action {
    readonly type = ADD_RECEIPE;
    constructor(public payload: Receipe) { }
}

export class UpdateReceipe implements Action {
    readonly type = UPDATE_RECEIPE;
    constructor(public payload: { index: number; newReceipe: Receipe }) { }
}

export class DeleteReceipe implements Action {
    readonly type = DELETE_RECEIPE;
    constructor(public payload: number) { }
}

export type ReceipesActionsType =
    SetReceipes |
    StoreReceipes |
    FetchReceipes |
    AddReceipe |
    UpdateReceipe |
    DeleteReceipe;