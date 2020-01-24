import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
 
  }

  // logout method which clears the session value of token and route to the login page
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
