import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface userData {
  id:Number,
  name:String,
  email:String
}
interface loginData {
    email:string,
    password:String
}

@Injectable()
export class UserService {

  private getUserData_url : string = "http://localhost:8000/api/auth/";

  private checkLogin_url : string = "http://localhost:8000/api/auth";

  private addUserData_url : string = "http://localhost:8000/api/users";
  

  constructor(private http:HttpClient) { }

  getUserData():Observable<userData[]>{

    return this.http.get<userData[]>(this.getUserData_url);

  }

  checkUserLogin(data):Observable<any>{

    return this.http.post(this.checkLogin_url,data);

  }

  addUserData(name,email,password ){

    return this.http.post<any>(this.addUserData_url,{"name":name,"email":email,"password":password});

  }

}
