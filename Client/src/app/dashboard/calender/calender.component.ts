import {   Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  calendarPlugins = [dayGridPlugin];
  calendarEvents:any[]=[
    {start:'2020-01-09',title:'Meeting with A'},
    {start:'2020-01-10',title:'Meeting with B'},
    {start:'2020-01-12',title:'Meeting with C'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
