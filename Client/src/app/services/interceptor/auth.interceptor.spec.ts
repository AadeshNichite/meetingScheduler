import { TestBed, async, inject } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'; 
import { HttpInterceptor,HttpHandler,HttpRequest,HttpEvent, HttpHeaders } from '@angular/common/http';

class MockAuthInterceptor {

    intercept = false;

    isIntercept(){
        return this.intercept;
    }
}

describe('AuthInterceptor', () => {


    let service : MockAuthInterceptor;

    beforeEach(()=>{
        service = new MockAuthInterceptor()
    })

    afterEach(()=>{
        service = null;
    })

    it("should return false when the user not is authenticated.",()=>{
        service.intercept = true;
        expect(service.isIntercept()).toBeTruthy();
    })

    it("should return true when the user is authenticated.",()=>{ 
        service.intercept = false;
        expect(service.isIntercept()).toBeFalsy();
    })

});