import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
    private closeSub: Subscription;
    private storeSub: Subscription; //With NgRx

    constructor(
        // private authService: AuthService,
        // private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromApp.AppState>
    ) { }

    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if (this.error) {
                this.showErrorAlert(this.error);
            }
        });
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        // let authObs: Observable<AuthResponseData>; //With Service
        this.isLoading = true;
        if (this.isLoginMode) {
            // authObs = this.authService.onLogin(email, password); //With Service
            this.store.dispatch(new AuthActions.LoginStart({ //With NgRx
                email: email,
                password: password
            }));
        } else {
            // authObs = this.authService.signUp(email, password); //With Service
            this.store.dispatch(new AuthActions.SignupStart({ //With NgRx
                email: email,
                password: password
            }));
        }
        /**
         * With Service
         authObs.subscribe(resData => {
         console.log(resData);
         this.isLoading = false;
         this.router.navigate(['/receipes']);
         }, errorMessage => {
         console.log(errorMessage);
         this.error = errorMessage;
         this.showErrorAlert(errorMessage);
         this.isLoading = false;
         });
        */
        /**
         * With NgRx
        */
        form.reset();
    }

    onHandleError() {
        // this.error = null; //With Service
        this.store.dispatch(new AuthActions.ClearError()); //With NgRx
    }

    private showErrorAlert(errorMessage: string) {
        const alertComponentFactory =
            this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        componentRef.instance.message = errorMessage;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }

}