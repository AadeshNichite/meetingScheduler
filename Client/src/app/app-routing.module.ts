import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalenderComponent } from './dashboard/calender/calender.component';
import { AddMeetingComponent } from './dashboard/add-meeting/add-meeting.component';
import { DelMeetingComponent } from './dashboard/del-meeting/del-meeting.component';
import { ShowMeetingComponent } from './dashboard/show-meeting/show-meeting.component';
import { UpdateMeetingComponent } from './dashboard/update-meeting/update-meeting.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { 
    path: 'register',  
    component : RegistrationComponent 
  },
  {
    path: '',
    component : LoginComponent
  },
  // {
  //   path: '**',
  //   component : LoginComponent

  // },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path: 'addMeeting',
        component : AddMeetingComponent
      },
      {
        path: 'delMeeting',
        component : DelMeetingComponent
      },
      {
        path: 'showMeeting',
        component : ShowMeetingComponent
      },
      {
        path: 'updateMeeting',
        component : UpdateMeetingComponent
      },
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
export const routingComponents = [  LoginComponent , RegistrationComponent, DashboardComponent, CalenderComponent, AddMeetingComponent, DelMeetingComponent,
                                    ShowMeetingComponent, UpdateMeetingComponent ]
