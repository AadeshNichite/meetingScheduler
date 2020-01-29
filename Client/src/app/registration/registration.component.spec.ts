import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { UserService } from '../services/user/user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'; 
import { RouterTestingModule } from "@angular/router/testing";

describe('RegistrationComponent', () => {

    let component : RegistrationComponent;
    let fixure:ComponentFixture<RegistrationComponent>
    let userService : UserService

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[RouterTestingModule,HttpClientTestingModule,FormsModule],
            providers:[UserService],
            declarations:[RegistrationComponent]
        })

        fixure = TestBed.createComponent(RegistrationComponent);
        component = fixure.componentInstance;
        userService = TestBed.get(UserService)

    })

    it("name invalid when empty",()=>{

        expect(component.name).toBeFalsy();

    })

    it("email invalid when empty",()=>{

        expect(component.email).toBeFalsy();

    })

    it("password invalid when empty",()=>{

        expect(component.password).toBeFalsy();

    })


});
