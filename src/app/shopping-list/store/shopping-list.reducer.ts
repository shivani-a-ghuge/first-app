import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
    ingredients: Ingredient[];
    edittedIngredient: Ingredient;
    edittedIngredientIndex: number
}

const initialState: State = {
    ingredients: [],
    edittedIngredient: null,
    edittedIngredientIndex: -1
};

export function shoppingListReducer(
    currentState: State = initialState,
    action: ShoppingListActions.ShoppingListActionsType
) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...currentState,
                ingredients: [...currentState.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...currentState,
                ingredients: [...currentState.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = currentState.ingredients[currentState.edittedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            }
            const updatedIngredients = [...currentState.ingredients];
            updatedIngredients[currentState.edittedIngredientIndex] = updatedIngredient;
            return {
                ...currentState,
                ingredients: updatedIngredients,
                edittedIngredientIndex: -1,
                edittedIngredient: null
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...currentState,
                ingredients: currentState.ingredients.filter((ig, igIndex) => {
                    return igIndex !== currentState.edittedIngredientIndex
                }),
                edittedIngredientIndex: -1,
                edittedIngredient: null
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...currentState,
                edittedIngredientIndex: action.payload,
                edittedIngredient: { ...currentState.ingredients[action.payload] }
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...currentState,
                edittedIngredientIndex: -1,
                edittedIngredient: null
            };
        default:
            return currentState;
    }
}