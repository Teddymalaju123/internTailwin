
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileService } from './shared/service/profile.service';
import { SharedAppModule } from './shared/shared-app.module';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ProfileDetailComponent
  ],
  imports: [
    SharedAppModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
