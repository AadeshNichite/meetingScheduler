import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  closeResult: string;

  constructor(private router: Router,private http : HttpClient) {
   }

  ngOnInit() {
    
  }

checkLogin(email,password){

  
    if(email && password){

      this.http.post("http://localhost:8000/api/auth",{ email,password })
      .subscribe(data  => {
          let token = data['token'];
          sessionStorage.setItem('key',token);
          this.router.navigate(['/dashboard']);
         },error  => {
      
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
