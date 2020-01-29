import { TestBed,ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { UserService } from 'src/app/services/user/user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'; 
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
    let component : LoginComponent;
    let fixure:ComponentFixture<LoginComponent>
    let userService : UserService
  
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[RouterTestingModule,HttpClientTestingModule,FormsModule],
            providers:[UserService],
            declarations:[LoginComponent]
        })

        fixure = TestBed.createComponent(LoginComponent);
        component = fixure.componentInstance;
        userService = TestBed.get(UserService)
    
    })

    it("should return username and password value when user get loggedIn",()=>{

        component.email= 'aadeshnichite88@gmail.com';
        component.password = '123456'
        component.checkLogin(component.email,component.password);
        expect(component.email).toBe('aadeshnichite88@gmail.com');
        expect(component.password).toBe('123456');
        
    })

    it("email invalid when empty",()=>{

        expect(component.email).toBeFalsy();

    })

    it("password invalid when empty",()=>{

        expect(component.password).toBeFalsy();

    })
});

