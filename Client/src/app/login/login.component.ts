import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import * as $ from 'jquery';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  closeResult: string;

  constructor(private router: Router,private http : HttpClient,private _userService: UserService) {
   }

  ngOnInit() {
    
  }

checkLogin(email,password){

  
    if(email && password){


      this._userService.checkUserLogin({email,password})
      .subscribe(data=>{
        console.log(data);
        let token = data['token'];
        sessionStorage.setItem('key',token);
        this.router.navigate(['/dashboard']);
      },error =>{

        $('.modal-body').text(error.error.errors[0].msg);
        $('.modal').show();
       }
      );
      }
      else{
        $('.modal').show();
      }

    } 
    closeModal(){
      $('.modal').hide();
    }

}
