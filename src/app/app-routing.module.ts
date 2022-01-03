import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';
import {AuthGuard} from './auth/auth.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./pages/detail/detail.module').then( m => m.DetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./pages/edit/edit.module').then( m => m.EditPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    loadChildren: () => import('./pages/new/new.module').then( m => m.NewPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'author',
    loadChildren: () => import('./pages/author/author.module').then( m => m.AuthorPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'author/:id',
    loadChildren: () => import('./pages/author/author.module').then( m => m.AuthorPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'import',
    loadChildren: () => import('./pages/import/import.module').then( m => m.ImportPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./pages/verify/verify.module').then( m => m.VerifyPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
