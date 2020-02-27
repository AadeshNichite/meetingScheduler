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

  private deleteMeetingData_url: string = "http://localhost:8000/api/meeting/meeting";

  private updateMeetingData_url: string = "http://localhost:8000/api/meeting/updateMeeting";

  private getMeetingForMe_url : string = "http://localhost:8000/api/meeting/meetingsForMe";

  getMeetingData():Observable<meetingData[]>{

    return this.http.get<meetingData[]>(this.getMeetingData_url);

  }

  addMeetingData({title,start,end,id}){

    return this.http.post<any>(this.addMeetingData_url,{"title":title,"start":start,"end":end,"id":id});

  }

  deleteMeetingData({meetingNumber}){

    return this.http.post<any>(this.deleteMeetingData_url,{"meetingNumber":meetingNumber});

  }

  updateMeetingData({meetingNumber,title,start,end,id}){

    return this.http.post<any>(this.updateMeetingData_url,{"meetingNumber":meetingNumber,"title":title,"start":start,"end":end,"id":id});

  }

  getMeetingAllocatedForMe(){
    return this.http.get<any>(this.getMeetingForMe_url);
  }

}