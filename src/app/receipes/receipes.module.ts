import { NgModule } from "@angular/core";

import { ReceipesComponent } from './receipes.component';
import { ReceipeListComponent } from './receipe-list/receipe-list.component';
import { ReceipeDetailComponent } from './receipe-detail/receipe-detail.component';
import { ReceipeItemComponent } from './receipe-list/receipe-item/receipe-item.component';
import { ReceipeStartComponent } from './receipe-start/receipe-start.component';
import { ReceipeEditComponent } from './receipe-edit/receipe-edit.component';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { ReceipeRoutingModule } from "./receipes-routing.module";
import { SharedModule } from "./../shared/shared.module";

@NgModule({
    declarations: [
        ReceipesComponent,
        ReceipeListComponent,
        ReceipeDetailComponent,
        ReceipeItemComponent,
        ReceipeStartComponent,
        ReceipeEditComponent,
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        ReceipeRoutingModule,
        SharedModule
    ]
})
export class ReceipeModule {

}