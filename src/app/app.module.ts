
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileService } from './shared/service/profile.service';
import { SharedAppModule } from './shared/shared-app.module';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { SpinnerLoadModule } from './shared/components/spinner-load/spinner-load.module';
import { SpinnerInterceptorService } from './shared/interceptor/spinner-interceptor.service';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';





@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ProfileDetailComponent,
    CreateTaskComponent,
    EditTaskComponent
  ],
  imports: [
    SpinnerLoadModule,
    SharedAppModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,

    
  ],
  providers: [ProfileService, { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
