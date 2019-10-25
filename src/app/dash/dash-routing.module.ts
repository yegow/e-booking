import { NgModule } from "@angular/core";
import { DashPage } from './dash.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: DashPage,
        children: [
            {
                path: 'properties',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./properties/properties.module')
                            .then(m => m.PropertiesPageModule)
                    }
                ]
            },
            {
                path: 'properties/mines',
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
                redirectTo: '/dash/properties',
                pathMatch: 'full'
            }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashPageRoutingModule {}