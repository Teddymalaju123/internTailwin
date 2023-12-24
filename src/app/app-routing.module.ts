import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
const routes: Routes = [
  {
    path: '', redirectTo: '/profile', pathMatch: 'full'
  },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile-detail', component: ProfileDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
