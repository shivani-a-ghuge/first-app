import { User } from "../user.model"
import * as AuthActions from "./auth.actions";

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
}

export function authReducer(
    currentState: State = initialState,
    action: AuthActions.AuthActionsType
) {
    switch (action.type) {
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return {
                ...currentState,
                authError: null,
                loading: true
            }
        case AuthActions.AUTHENTICATE_SUCCESS:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate,
            );
            return {
                ...currentState,
                authError: null,
                user: user,
                loading: false
            };
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...currentState,
                user: null,
                authError: action.payload,
                loading: false
            }
        case AuthActions.CLEAR_ERROR:
            return {
                ...currentState,
                authError: null
            }
        case AuthActions.LOGOUT:
            return {
                ...currentState,
                user: null
            };
        default:
            return currentState;
    }
}