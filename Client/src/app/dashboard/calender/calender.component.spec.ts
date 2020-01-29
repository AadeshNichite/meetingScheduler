import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalenderComponent } from './calender.component';
import { MeetingService } from 'src/app/services/meeting/meeting.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'; 
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from '@angular/forms';

describe('CalenderComponent', () => {

    let component : CalenderComponent;
    let fixure:ComponentFixture<CalenderComponent>
    let userService : MeetingService
  
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[RouterTestingModule,HttpClientTestingModule,FormsModule],
            providers:[MeetingService],
            declarations:[CalenderComponent]
        })

        fixure = TestBed.createComponent(CalenderComponent);
        component = fixure.componentInstance;
        userService = TestBed.get(MeetingService)
    
    })

    // it("password invalid when empty",()=>{


    // })

});
