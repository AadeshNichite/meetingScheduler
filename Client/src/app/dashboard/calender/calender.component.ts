import {   Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  calendarPlugins = [dayGridPlugin,interactionPlugin];
  calendarEvents : any[]= []
  constructor(private router: Router,private http : HttpClient,private _userService: UserService  ) { }

  ngOnInit() {

    this._userService.getUserData()
    .subscribe(data=>{
      console.log(data);
    });
  
  }

  dayRender(args){

    var cell:HTMLElement = args.el;

    cell.onclick = (ev:MouseEvent)=>{

     console.log(args.el)
     var values=this.calendarEvents.filter(function (el){

          return  args.date == el.dayDate

        })
        if(values.length>0){

         console.log(values);
         $('#updateEvent').show();
        
        }
        else{

          $('#addEvent').show();

        }
    }  
  }

  closeModal(){
    $('.modal').hide();
  }
}
