import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalenderComponent } from './dashboard/calender/calender.component';
import { AuthGuard } from './services/guard/auth.guard';
import { MeetingViewComponent } from './dashboard/calender/meeting-view/meeting-view.component';

const routes: Routes = [
  { 
    path: 'register',  
    component : RegistrationComponent 
  },
  {
    path: '',
    component : LoginComponent
  },
  {
    path: 'view',
    canActivate:[AuthGuard],
    component : MeetingViewComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'calendar',
        component : CalenderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [  LoginComponent , RegistrationComponent, DashboardComponent, CalenderComponent ]
