import {Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  calendarPlugins = [dayGridPlugin,interactionPlugin];
  calendarEvents : any[]= [];
  clickedDate;
  values:any[];
  constructor(private router: Router,private http : HttpClient,
    private _userService: UserService,private _meetingService : MeetingService) { }

  ngOnInit() {

    this._userService.getUserData()
    .subscribe(data=>{
      console.log(data);
    });

    this._meetingService.getMeetingData()
    .subscribe(data => {
      let arr=[]
      data.forEach(element => {
  
        element['meetingTitle'] && arr.push({
          id:element['_id'],
          title: element['meetingTitle'],
          start:new Date(element['strating']),
          end:new Date(element['endTime'])
        })

        this.calendarEvents = arr
        
      });

    })
  
  }

  dayRender(args){

    var cell:HTMLElement = args.el;

    cell.onclick = (ev:MouseEvent)=>{
      

     this.clickedDate=args.el;

     this.values=this.calendarEvents.filter(function (el){

          return args.date.toDateString() == el.start.toDateString()

        })
        console.log(this.values)
        if(this.values.length>0){

         $('#updateEvent').show();
         $('#addEvent').hide();
         $('#updateMeetingBody').hide();
        
        }
        else{

          $('#updateEvent').hide();
          $('#addEvent').show();
          $('#updateMeetingBody').hide();

        }
    }

  }

  closeModal(){
    $('#addEvent').hide();
    $('#updateEvent').hide();
    $('#updateMeetingBody').hide();
  }

  addmodal(){
    $('#updateEvent').hide();
    $('#addEvent').show();
    $('#updateMeetingBody').hide();
  }

  updateModal(meetingNumber){

    $('#updateMeetingBody').show();
    this.values=this.values.filter(function (el){

      return el.meetingNumber=meetingNumber;
    })
    console.log(this.values);

  }

  updateModalData(meetingNumber,title,start,end){

    $('#updateMeetingBody').show();
    console.log(meetingNumber,title,start,end);

    var strating = this.stringToDateConvert(start);
    var endTime = this.stringToDateConvert(end);

    this._meetingService.updateMeetingData({meetingNumber,title,strating,endTime})
    .subscribe(data=>{
      location.reload()
    },error =>{
      $('.modal-body').text(error.error.errors[0].msg);
      $('.modal').show();
     }
    );
    
  }

  addEvent(meetingTitle,start,end){

    if(meetingTitle && start && end){


      var strating = this.stringToDateConvert(start);
      var endTime = this.stringToDateConvert(end);

      console.log(strating,endTime);

      this._meetingService.addMeetingData({meetingTitle,strating,endTime})
      .subscribe(data=>{
        location.reload()
      },error =>{
        $('.modal-body').text(error.error.errors[0].msg);
        $('.modal').show();
       }
      );
      }
      else{
        $('.modal').show();
      }

  }

  stringToDateConvert(start){

    var clickedDateNumber = (this.clickedDate.getAttribute('data-date')+' '+start).toString();
    console.log(clickedDateNumber)
    var dateString = clickedDateNumber,
    dateTimeParts = dateString.split(' '),
    timeParts = dateTimeParts[1].split(':'),
    dateParts = dateTimeParts[0].split('-'),
    date;
    date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[2]), parseInt(timeParts[0]), parseInt(timeParts[1]));
    return date;

  }

  deleteMeeting(meetingNumber){

    console.log(meetingNumber);

    this._meetingService.deleteMeetingData({meetingNumber})
    .subscribe(data => {
          location.reload()
        })
    }

}
