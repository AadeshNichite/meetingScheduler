import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private http : HttpClient){
  
  }
  email:string;
  password:string;

  displayName=true;

  ngOnInit() {

  }

  submitData(email,password){ 

    //api get call with observable and subscribe
      // let obs = this.http.get('https://api.github.com/users/AadeshNichite');
      // obs.subscribe((response)=>console.log(response));

      if(email && password){
        this.http.post("http://localhost:8000/api/auth",{ email,password }).
          subscribe(data  => {
            console.log("POST Request is successful ", data);
            sessionStorage.setItem("key",'data');
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
