import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login/login.component';
import { RegistrationComponent } from './registration/registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [LoginComponent, RegistrationComponent, DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  exports:[
    LoginComponent,
    RegistrationComponent
  ]
})
export class UserModule { }
