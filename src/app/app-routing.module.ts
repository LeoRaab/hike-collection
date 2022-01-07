import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

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
    path: 'author/friend/add/:authorId',
    loadChildren: () => import('./pages/add-friend/add-friend.module').then( m => m.AddFriendPageModule),
    canActivate: [AuthGuard]
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
    path: 'verify',
    loadChildren: () => import('./pages/verify/verify.module').then( m => m.VerifyPageModule)
  },
  {
    path: 'add-friend',
    loadChildren: () => import('./pages/add-friend/add-friend.module').then( m => m.AddFriendPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
