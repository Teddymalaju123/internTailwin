import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './homework/profile/profile.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/profile', pathMatch: 'full'
  },
  { path: 'profile', component: ProfileComponent },
  {
    path: '',
    loadChildren: () =>
      import('src/app/homework/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
