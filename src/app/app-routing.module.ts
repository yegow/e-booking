import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RedirectAuthenticatedGuard } from './auth/redirect-authenticated.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  {
    path: 'properties',
    loadChildren: () => import('./properties/properties.module')
      .then(m => m.PropertiesPageModule),
      canActivate: [RedirectAuthenticatedGuard],
      canLoad: [RedirectAuthenticatedGuard]
  },
  {
    path: 'dash',
    loadChildren: () => import('./dash/dash.module')
      .then(m => m.DashPageModule),
    canActivate: [AuthGuard],
    // canLoad: [] // Implement later.
  },
  {
    path: 'properties/:id', loadChildren: () => import('./property/property.module')
      .then(m => m.PropertyPageModule)
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
