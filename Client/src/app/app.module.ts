import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthGuard } from './services/guard/auth.guard';
import { HeaderComponent } from './dashboard/header/header.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { AuthInterceptor } from './services/interceptor/auth.interceptor';
import { UserService } from './services/user/user.service';
import { MeetingService } from './services/meeting/meeting.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MeetingViewComponent } from './dashboard/calender/meeting-view/meeting-view.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    MeetingViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot()

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
