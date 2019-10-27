import { Routes, RouterModule } from "@angular/router";
import { MyPropertiesPage } from './my-properties.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: MyPropertiesPage,
        children: [
            {
                path: 'all',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./me/me.module')
                            .then(m => m.MePageModule)
                    }
                ]
            },
            {
                path: 'payment-history',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./payment-history/payment-history.module')
                            .then(m => m.PaymentHistoryPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/dash/properties/mines/all',
                pathMatch: 'full'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyPropertiesPageRoutingModule {

}