import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// import { ShoppingListService } from './shopping-list/shopping-list.service';
// import { ReceipeService } from './receipes/receipe.service';

import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers: [
        // ShoppingListService,
        // ReceipeService,
        {
            provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
        }
    ]
})
export class CoreModule {

}