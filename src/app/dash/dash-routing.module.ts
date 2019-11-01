import { NgModule } from '@angular/core';
import { DashPage } from './dash.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: DashPage,
        children: [
            {
                path: 'property-list',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./properties/properties.module')
                            .then(m => m.PropertiesPageModule)
                    }
                ]
            },
            {
                path: 'property-list/mines',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./my-properties/my-properties.module')
                            .then(m => m.MyPropertiesPageModule)
                    }
                ]
            },
            {
                path: 'account',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./account/account.module')
                            .then(m => m.AccountPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/dash/property-list',
                pathMatch: 'full'
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashPageRoutingModule {}
