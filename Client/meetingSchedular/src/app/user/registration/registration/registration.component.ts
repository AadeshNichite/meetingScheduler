import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  username:string;
  email:string;
  password:string;
  reEnteredPassword:string;  

  constructor(private router: Router,private http : HttpClient) { }

  ngOnInit() {
  }
  registerData(username,email,password,reEnteredPassword){

    if( password == reEnteredPassword && username && email ){

    this.http.post("http://localhost:8000/api/users",{ username,email,password }).
    subscribe(data  => {
        console.log("POST Request is successful ", data);
        sessionStorage.setItem("key",'data');
        this.router.navigate(['/dashboard']);
      },error  => {
        alert(error);
          console.log("Error", error);
      });

    }
    else{
      alert("Fill all the fields..!");
    }
  }

}
