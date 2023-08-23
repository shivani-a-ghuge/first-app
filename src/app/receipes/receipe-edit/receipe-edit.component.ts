import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from "../../store/app.reducer";
import * as ReceipeActions from "../store/receipe.actions";
// import { ReceipeService } from '../receipe.service';

@Component({
  selector: 'app-receipe-edit',
  templateUrl: './receipe-edit.component.html',
  styleUrls: ['./receipe-edit.component.css']
})
export class ReceipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode = false;
  receipeForm: FormGroup;

  private storeSub: Subscription; //With NgRx

  constructor(
    private route: ActivatedRoute,
    // private receipeService: ReceipeService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }

  private initForm() {
    let receipeName = '';
    let receipeImagePath = '';
    let receipeDescription = '';
    let receipeIngredients = new FormArray([]);
    if (this.editMode) {
      // const receipe = this.receipeService.getReceipe(this.id); //With Service
      this.storeSub = this.store.select('receipes').pipe(
        map(receipeState => {
          return receipeState.receipes.find((receipe, index) => {
            return index === this.id;
          })
        })
      ).subscribe(receipe => {
        receipeName = receipe.name;
        receipeImagePath = receipe.imagePath;
        receipeDescription = receipe.description;
        if (receipe['ingredients']) {
          for (let ingredient of receipe.ingredients) {
            receipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            )
          }
        }
      });
      /**
       * With Service
       receipeName = receipe.name;
       receipeImagePath = receipe.imagePath;
       receipeDescription = receipe.description;
       if (receipe['ingredients']) {
       for (let ingredient of receipe.ingredients) {
       receipeIngredients.push(
       new FormGroup({
       'name': new FormControl(ingredient.name, Validators.required),
       'amount': new FormControl(ingredient.amount, [
       Validators.required,
       Validators.pattern(/^[1-9]+[0-9]*$/)
       ])
       })
       )
       }
       }
      */
    }
    this.receipeForm = new FormGroup({
      'name': new FormControl(receipeName, Validators.required),
      'imagePath': new FormControl(receipeImagePath, Validators.required),
      'description': new FormControl(receipeDescription, Validators.required),
      'ingredients': receipeIngredients
    });
  }

  get controls() {
    return (<FormArray>this.receipeForm.get('ingredients')).controls;
  }

  onAddIngredients() {
    (<FormArray>this.receipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onSubmit() {
    // const newReceipe = new Receipe(
    //   this.receipeForm.value['name'],
    //   this.receipeForm.value['description'],
    //   this.receipeForm.value['imagePath'],
    //   this.receipeForm.value['ingredients']
    // );
    if (this.editMode) {
      // this.receipeService.updateReceipe(this.id, newReceipe);
      // this.receipeService.updateReceipe(this.id, this.receipeForm.value); //With Service
      this.store.dispatch(new ReceipeActions.UpdateReceipe({ //With NgRx
        index: this.id,
        newReceipe: this.receipeForm.value
      }));
    } else {
      // this.receipeService.addReceipe(newReceipe);
      // this.receipeService.addReceipe(this.receipeForm.value); //With Service
      this.store.dispatch(new ReceipeActions.AddReceipe(this.receipeForm.value)); //With NgRX
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.receipeForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
