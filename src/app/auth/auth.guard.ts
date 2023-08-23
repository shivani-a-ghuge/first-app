import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
// import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        // private authService: AuthService,
        private router: Router,
        private store: Store<fromApp.AppState>
    ) {

    }

    canActivate(
        route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        /**
         * With Service
         return this.authService.user.pipe(
         take(1),
         map(user => {
         const isAuth = !!user;
         if (isAuth) {
         return true;
         }
         return this.router.createUrlTree(['/auth']);
         })
         );
        */
        /**
         * With NgRx
        */
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            })
        );
    }

}