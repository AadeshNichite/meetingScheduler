import { Component, OnInit } from '@angular/core';
import { MeetingService } from 'src/app/services/meeting/meeting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meeting-view',
  templateUrl: './meeting-view.component.html',
  styleUrls: ['./meeting-view.component.css']
})
export class MeetingViewComponent implements OnInit {

  meetingsAssigned:[];
  meetingAttendees:any[]=[];
  tempMeetArray:any[]=[];
  constructor(private _meetingService : MeetingService,private router: Router) { }

  ngOnInit() {
    this._meetingService.getMeetingAllocatedForMe()
    .subscribe(data =>{
      let arr=[];
      this.meetingsAssigned = data;
      this.tempMeetArray=data.map((el)=>{
        return{
          ...el,
          Start:new Date(el['Start']),
          End:new Date(el['End'])

        }
      })
      console.log( this.tempMeetArray )
      if(data.length == 0){
        alert('No Meeting Availabel For You');
        this.router.navigate(['dashboard']);
      }
      // console.log(this.meetingsAssigned)
      for(let i=0;i<data.length;i++){
        for(let j=0;j<data[i].peopleForThisMeeting.length;j++){
          this.meetingAttendees.push(data[i].peopleForThisMeeting[j])
        }
      }

    })
  }
}
