import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface meetingData {

  id:number,
  title:String,
  start:String,
  end:String

}

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http:HttpClient) { }

  private getMeetingData_url: string = "http://localhost:8000/api/meeting/";

  private addMeetingData_url: string = "http://localhost:8000/api/meeting/add";

  private deleteMeetingData_url: string = "http://localhost:8000/api/meeting/";

  private updateMeetingData_url: string = "http://localhost:8000/api/meeting/updateMeeting";

  getMeetingData():Observable<meetingData[]>{

    return this.http.get<meetingData[]>(this.getMeetingData_url);

  }

  addMeetingData({meetingTitle,strating,endTime}){

    return this.http.post<any>(this.addMeetingData_url,{"meetingTitle":meetingTitle,"strating":strating,"endTime":endTime});

  }

  deleteMeetingData({meetingNumber}){
    
    return this.http.delete<any>(this.deleteMeetingData_url);

  }

  updateMeetingData({meetingNumber,title,strating,endTime}){

    return this.http.post<any>(this.updateMeetingData_url,{"meetingNumber":meetingNumber,"meetingTitle":title,"strating":strating,"endTime":endTime});

  }

}
