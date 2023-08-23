import { Receipe } from "../receipe.model";
import * as ReceipesActions from "../store/receipe.actions";

export interface State {
    receipes: Receipe[];
}

const initialState: State = {
    receipes: []
}

export function receipeReducer(
    currentState = initialState,
    action: ReceipesActions.ReceipesActionsType
) {
    switch (action.type) {
        case ReceipesActions.SET_RECEIPES:
            return {
                ...currentState,
                receipes: [...action.payload]
            }
        case ReceipesActions.ADD_RECEIPE:
            return {
                ...currentState,
                receipes: [...currentState.receipes, action.payload]
            }
        case ReceipesActions.UPDATE_RECEIPE:
            const updatedReceipe = {
                ...currentState.receipes[action.payload.index],
                ...action.payload.newReceipe
            };
            const updateReceipes = [...currentState.receipes];
            updateReceipes[action.payload.index] = updatedReceipe;
            return {
                ...currentState,
                receipes: updateReceipes
            }
        case ReceipesActions.DELETE_RECEIPE:
            return {
                ...currentState,
                receipes: currentState.receipes.filter((receipe, index) => {
                    return index !== action.payload;
                })
            }
        default:
            return currentState;
    }
}