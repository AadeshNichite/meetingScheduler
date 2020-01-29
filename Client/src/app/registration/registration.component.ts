import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  name:string;
  email:string;
  password:string;
  reEnteredPassword:string;

  constructor(private router: Router,private http : HttpClient,private userService: UserService) { }

  ngOnInit() {
  }
  registerData(name,email,password,reEnteredPassword){

    if( password == reEnteredPassword && name && email ){

      this.userService.addUserData(name,email,password)
      .subscribe(data=>{

        console.log("POST Request is successful ", data);
        let token = data['token'];
        sessionStorage.setItem('key',token);
        this.router.navigate(['/dashboard']);
        
      } ,error  => {
            $('.modal-body').text(error.error.errors[0].msg);
            $('.modal').show();
        });

      }
      else{
        $('.modal').show();
      }
  }
  closeModal(){
    $('.modal').hide();
  }

}
