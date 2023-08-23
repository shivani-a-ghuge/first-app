import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from "@ngrx/store";
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Receipe } from '../receipe.model';
import * as fromApp from "../../store/app.reducer";
// import { ReceipeService } from '../receipe.service';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit, OnDestroy {

  receipes: Receipe[];
  subscription: Subscription;

  constructor(
    // private receipeService: ReceipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    /**
     * With Service
     this.subscription = this.receipeService.receipesChanged.subscribe((receipes: Receipe[]) => {
     this.receipes = receipes;
     })
    */
    /**
     * With NgRx
    */
    this.subscription = this.store.select('receipes').pipe(
      map(receipesState => receipesState.receipes)
    ).subscribe((receipes: Receipe[]) => {
      this.receipes = receipes;
    });
    // this.receipes = this.receipeService.getReceipes(); //With Service
  }

  onNewReceipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}