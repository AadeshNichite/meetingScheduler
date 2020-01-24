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
  eventToUpdate:any[];
  constructor(private router: Router,private http : HttpClient,
  private _userService: UserService,private _meetingService : MeetingService) {}

  // on initialization of page the meeting data of the logged user is get using api call.
  ngOnInit() {
   
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

  // when user click on to the date that event is get by this function and on the basis of the day meeting it will render the modal which is need to show.
  dayRender(args){
    let cell:HTMLElement = args.el;
    cell.onclick = (ev:MouseEvent)=>{
      this.clickedDate=args.el;
      this.values=this.calendarEvents.filter(function (el){
        return args.date.toDateString() == el.start.toDateString()
      })
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

  // This method is called to close the modal.
  closeModal(){
    $('#addEvent').hide();
    $('#updateEvent').hide();
    $('#updateMeetingBody').hide();
  }

  // This method is called to open the modal for add meeting modal. 
  opneAddMeetingmodal(){
    $('#updateEvent').hide();
    $('#addEvent').show();
    $('#updateMeetingBody').hide();
  }

  // This method is called to open the modal for update meeting modal which shows the all meetings and we have to choose one to update. 
  openUpdateMeetingModal(meetingNumber){
    $('#updateEvent').hide();
    $('#updateMeetingBody').show();
    this.eventToUpdate;
    this.eventToUpdate=this.values.filter(function (el){
      return el.id == meetingNumber;
    })
  }

  // This method is called to open the modal for update the selected meeting data. Also it takes the the new data and send.
  getUpdateMeetingData(meetingNumber,title,start,end){
    $('#addEvent').hide();
    $('#updateEvent').hide();
    $('#updateMeetingBody').show();
    let strating = this.stringToDateConvert(start);
    let endTime = this.stringToDateConvert(end);
    this._meetingService.updateMeetingData({meetingNumber,title,strating,endTime})
    .subscribe(data=>{
      location.reload()
    },error =>{
        $('.modal-body').text(error.error.errors[0].msg);
        $('.modal').show();
      }
    );  
  }

  getAddMeetingData(meetingTitle,start,end){
    if(meetingTitle && start && end){
      let strating = this.stringToDateConvert(start);
      let endTime = this.stringToDateConvert(end);
      this._meetingService.addMeetingData({meetingTitle,strating,endTime})
      .subscribe(data=>{
        location.reload()
      },error =>{
        $('.modal-body').text(error.error.errors[0].msg);
        $('.modal').show();
        }
      );
    }
    else {
      $('.modal').show();
    }
  }

  stringToDateConvert(start){
    let clickedDateNumber = (this.clickedDate.getAttribute('data-date')+' '+start).toString();
    let dateString = clickedDateNumber,
    dateTimeParts = dateString.split(' '),
    timeParts = dateTimeParts[1].split(':'),
    dateParts = dateTimeParts[0].split('-'),
    date;
    date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[2]), parseInt(timeParts[0]), parseInt(timeParts[1]));
    return date;
  }

  deleteMeeting(meetingNumber){
    console.log(meetingNumber)
    this._meetingService.deleteMeetingData({meetingNumber})
    .subscribe(data => {
      location.reload()
    })
  }
}
