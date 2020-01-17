import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  token:string;

  constructor(private router: Router,private http : HttpClient) { }

  ngOnInit() {
  }

checkLogin(email,password){
  
    if(email && password){

      this.http.post("http://localhost:8000/api/auth",{ email,password })
      .subscribe(data  => {
          this.token = JSON.stringify(data);
          sessionStorage.setItem('key',this.token);
          this.router.navigate(['/dashboard']);
         },error  => {
          alert("Something is wrong.please enter again...");
          console.log("Error", error);
        });
      }
      else{
        alert("Fill all the fields..!");
      }

    }

}
