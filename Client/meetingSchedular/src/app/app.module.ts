import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './user/registration/registration/registration.component';
import { LoginComponent } from './user/login/login/login.component';
import { DashboardComponent } from './user/dashboard/dashboard/dashboard.component';
// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


const appRoutes: Routes = [
  { path: 'register',  component : RegistrationComponent },
  { path: '',component : LoginComponent  },
  { path: 'dashboard', component : DashboardComponent }
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes // <-- debugging purposes only
    ),
    // CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
