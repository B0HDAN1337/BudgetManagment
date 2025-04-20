import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-log-in',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-log-in.component.html',
  styleUrl: './user-log-in.component.css'
})
export class UserLogInComponent {

  private getUserUrl = 'http://localhost:5142/api/User/login';
  
  LoginObj:any = {
    "UserName": "string",
    "Email": "",
    "Password": ""
  }

  //bool query to check if button already pushed
  submitted = false;

  constructor(private http: HttpClient) {}

  LoginOn(form:NgForm)
  {
    this.submitted = true;

    if(form.invalid)
    {
      return;
    }
    
    this.AutorizeUser();

    console.log(this.LoginObj);
 
  }

  //Post request to log in user by email and password
  AutorizeUser()
  {
    this.http.post(this.getUserUrl, this.LoginObj).subscribe( success =>
      {
        console.log("Success Log in", success);
        alert("Success Log in");
      },
      error =>
      {
        console.log("Error log in", error);
        alert("Error Log in");
      });
  }
}
