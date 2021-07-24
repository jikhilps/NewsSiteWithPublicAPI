import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./Shared/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./News/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./UserHome/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./UserHome/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./UserHome/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'read-later',
    loadChildren: () => import('./UserHome/read-later/read-later.module').then( m => m.ReadLaterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
