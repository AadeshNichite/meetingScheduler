import { HeaderComponent } from './header.component';
import { Router } from '@angular/router'; 
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

let router: Router;
let valueServiceSpy: jasmine.SpyObj<HeaderComponent>;

describe('HeaderComponent', () => {

    let header : HeaderComponent;
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[RouterTestingModule],
            providers:[HeaderComponent]
        })
        header = TestBed.get(HeaderComponent); 
    })

    it("should return when user get logout.",()=>{
        let keyValue=sessionStorage.getItem("key");
        header.logout();
        expect(keyValue).toBeNull();
    })

});
