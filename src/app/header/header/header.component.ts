import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from "rxjs/operators";
// import { AuthService } from 'src/app/auth/auth.service';
// import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as AuthActions from "./../../auth/store/auth.actions";
import * as ReceipeActions from "./../../receipes/store/receipe.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    // private dataStorageService: DataStorageService,
    // private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {

  }

  ngOnInit() {
    /**
     * With Service
     this.userSub = this.authService.user.subscribe(user => {
     this.isAuthenticated = !user ? false : true;
     });
    */
    /**
     * With NgRx
    */
    this.userSub = this.store.select('auth').pipe(
      map(authState => authState.user)
    ).subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  onSaveData() {
    // this.dataStorageService.storeReceipes(); //With Service
    this.store.dispatch(new ReceipeActions.StoreReceipes()); //With NgRx
  }

  onFetchData() { 
    // this.dataStorageService.fetchReceipes().subscribe(); //With Service
    this.store.dispatch(new ReceipeActions.FetchReceipes()); //With NgRx
  }

  onLogout() {
    // this.authService.logout(); //With Service
    this.store.dispatch(new AuthActions.Logout()); //With NgRx
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
