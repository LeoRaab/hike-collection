import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LoggedInVerifiedGuard} from './auth/logged-in-verified.guard';
import {LoggedInNotVerifiedGuard} from './auth/logged-in-not-verified.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [LoggedInVerifiedGuard]
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./pages/detail/detail.module').then( m => m.DetailPageModule),
    canActivate: [LoggedInVerifiedGuard]
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./pages/edit/edit.module').then( m => m.EditPageModule),
    canActivate: [LoggedInVerifiedGuard]
  },
  {
    path: 'new',
    loadChildren: () => import('./pages/new/new.module').then( m => m.NewPageModule),
    canActivate: [LoggedInVerifiedGuard]
  },
  {
    path: 'author',
    loadChildren: () => import('./pages/author/author.module').then( m => m.AuthorPageModule),
    canActivate: [LoggedInVerifiedGuard]
  },
  {
    path: 'author/:id',
    loadChildren: () => import('./pages/author/author.module').then( m => m.AuthorPageModule),
    canActivate: [LoggedInVerifiedGuard]
  },
  {
    path: 'author/friend/add/:authorId',
    loadChildren: () => import('./pages/add-friend/add-friend.module').then( m => m.AddFriendPageModule),
    canActivate: [LoggedInVerifiedGuard]
  },
  {
    path: 'add-friend',
    loadChildren: () => import('./pages/add-friend/add-friend.module').then( m => m.AddFriendPageModule),
    canActivate: [LoggedInVerifiedGuard]
  },
  {
    path: 'verify',
    loadChildren: () => import('./pages/verify/verify.module').then( m => m.VerifyPageModule),
    canActivate: [LoggedInNotVerifiedGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
