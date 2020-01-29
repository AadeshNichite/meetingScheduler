import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
    let _auth : AuthGuard;
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[RouterTestingModule],
            providers:[AuthGuard]
        })
        _auth = TestBed.get(AuthGuard); 
    })

    it("should return true when token is not present into the sessionStorage.",()=>{
        expect(_auth.canActivate()).toBeFalsy();
    })

});
