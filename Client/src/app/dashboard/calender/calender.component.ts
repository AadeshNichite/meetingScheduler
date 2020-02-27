import {Component, OnInit, NgZone } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import dayGridWeek from '@fullcalendar/daygrid';
import dayGridDay from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user/user.service';
import { MeetingService } from 'src/app/services/meeting/meeting.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  //Global variables to store the data like clicked date,eventToUpdate,calenderEvents.
  calendarPlugins = [dayGridPlugin,interactionPlugin,dayGridWeek,dayGridDay];
  calendarEvents : any[]= [];
  clickedDate;
  values:any[];
  eventToUpdate:any[];
  tempArray:any[];
  disabled = false;
  showFilter = false;
  limitSelection = false;
  userData : any =[];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private router: Router,private http : HttpClient,private _ngZone: NgZone,
  private _userService: UserService,private _meetingService : MeetingService) {
  }

  // on initialization of page the meeting data of the logged user is get using api call.
  ngOnInit() {

    this._meetingService.getMeetingData()
    .subscribe(data => {
      let arr=[];
      console.log(data)
      data.forEach(element => {
        element['title'] && arr.push({
          id:element['_id'],
          title: element['title'],
          start:new Date(element['Start']),
          end:new Date(element['End'])
        })
      this.calendarEvents = arr
      });
    })


    this._userService.getAllUserIds()
      .subscribe(userData =>{
        this.userData = userData;
      })

      this.dropdownSettings = { 
        singleSelection: false, 
        idField:'_id',
        textField:"name",
        selectAllText:'Select All',
        unSelectAllText:'UnSelect All',
        enableSearchFilter: true,
        classes:"myclass custom-class",
        allowSearchFilter:this.showFilter
      };  
  }

  onItemSelect(item: any) {
    this.selectedItems.push()
  }
  onSelectAll(items: any) {
    this.selectedItems.push(items)
  }
  onItemDeSelect(item: any){
    this.selectedItems.push();
  }
  onItemDeSelectAll(){
    this.selectedItems = [];
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
        $('.container').addClass('myClass');
        $('#addEvent').hide();
        $('#updateMeetingBody').hide();
      }
      else{
        $('#updateEvent').hide();
        $('.container').addClass('myClass');
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
    $('.container').removeClass('myClass');
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
  getUpdateMeetingData(meetingNumber,title,starting,endTime){
    let flag=0;
    $('#addEvent').hide();
    $('#updateEvent').hide();
    $('#updateMeetingBody').show();
    if(meetingNumber && title && starting && endTime){

      let arr=[];
      let index;
      let start = this.stringToDateConvert(starting);
      let end = this.stringToDateConvert(endTime);

      // this.calendarEvents.forEach((el)=>{
      //   if(el.id == meetingNumber){
      //     if(el.title == title && JSON.stringify(el.start) == JSON.stringify(start) && JSON.stringify(el.end) == JSON.stringify(end)){
      //       alert('Same Data Added');
      //     }
      //   }
      // })


      this.tempArray = this.calendarEvents.find(function (el){
        return el.start.toDateString() == start.toDateString();
      })
      let id = this.selectedItems;

      // this.calendarEvents.forEach((el)=>{

      //   console.log((el.start.getTime() >= start.getTime()))

      //   if( el.start.getTime() == start.getTime()){
      //     alert('Your meeting already set for this time')
      //     flag = 1;
      //   }
      // })

      // if(flag == 0)
      // {      
          this._meetingService.updateMeetingData({meetingNumber,title,start,end,id})
          .subscribe(data=>{
            arr.push({
              id:data.id,
              title: title,
              start:start,
              end:end
            })
            this.calendarEvents.forEach((el)=>{
              if(el.id == meetingNumber){
                index = this.calendarEvents.indexOf(el);
              }
            })
            this.calendarEvents[index]=arr[0];
            alert('Meeting Updated')
            this.router.navigate(['dashboard']);
            $('#updateEvent').hide();
            $('#updateMeetingBody').hide();
            $('.container').removeClass('myClass');
          },error =>{
              $('.modal-body').text(error.error.errors[0].msg);
              $('.modal').show();
            }
          ); 
      // }
    }
    else{
      alert('Provide all fields..')
    }
  }

  //This function get the added data from a form of add component and then send back to sent backend to perform further operation.
  getAddMeetingData(title,starting,endTime){
    let arr=[];
    let flag=0;
    if(title && starting && endTime){
      let start = this.stringToDateConvert(starting);
      let end = this.stringToDateConvert(endTime);
      let id = this.selectedItems;

      this.calendarEvents.forEach((el)=>{

        console.log(el.start,start,(JSON.stringify(el.start) <= JSON.stringify(start)),el.end,end,
        (JSON.stringify(el.end) >= JSON.stringify(end)))

        if( el.start.getTime() == start.getTime() && (JSON.stringify(el.start) <= JSON.stringify(start) && 
        JSON.stringify(el.end) >= JSON.stringify(end))){
          alert('Meeting already set for this time')
          flag = 1;
        } 
      })

      if(flag == 0)
      {
          this._meetingService.addMeetingData({title,start,end,id})
          .subscribe(data=>{
            console.log(this.calendarEvents.length)
            arr.push({
              id:data.id,
              title: title,
              start:start,
              end:end
            })
            
            this.calendarEvents.push(arr[0]);
            alert('Meeting Added')
            this.router.navigate(['dashboard']);
            console.log(this.calendarEvents);
            $('#addEvent').hide();
            $('.container').removeClass('myClass');

          },error =>{
            $('.modal-body').text(error.error.errors[0].msg);
            }
          );
      }
    }
    else {
      alert('Provide All Fields');
    }
  }

  //Function to convert string format date into Date format
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

  //Function to delete meeting
  deleteMeeting(meetingNumber){
    let index;
    this._meetingService.deleteMeetingData({meetingNumber})
    .subscribe(msg => {
        if(msg.msg == "success")
        {
          this.calendarEvents.forEach((el)=>{
            if(el.id == meetingNumber){
              index = this.calendarEvents.indexOf(el);
            }
          })
          console.log(this.calendarEvents)
          this.calendarEvents.splice(index,1);
          this.router.navigate(['dashboard']);
          alert('Meeting Deleted')
          $('#updateEvent').hide();
          $('.container').removeClass('myClass');
        }
    })
  }
}