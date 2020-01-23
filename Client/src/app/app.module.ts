import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthGuard } from './guard/auth.guard';
import { HeaderComponent } from './dashboard/header/header.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { AuthInterceptor } from './guard/auth.interceptor';
import { UserService } from './services/user.service';
import { MeetingService } from './services/meeting.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    NgbModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi:true

    },
    UserService,
    MeetingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
