import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReceipesComponent } from './receipes.component';
import { ReceipeStartComponent } from './receipe-start/receipe-start.component';
import { ReceipeDetailComponent } from './receipe-detail/receipe-detail.component';
import { ReceipeEditComponent } from './/receipe-edit/receipe-edit.component';
import { ReceipesResolverService } from './receipes-resolver.service';
import { AuthGuard } from './../auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: ReceipesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ReceipeStartComponent },
            { path: 'new', component: ReceipeEditComponent },
            { path: ':id', component: ReceipeDetailComponent, resolve: [ReceipesResolverService] },
            { path: ':id/edit', component: ReceipeEditComponent, resolve: [ReceipesResolverService] }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class ReceipeRoutingModule {

}