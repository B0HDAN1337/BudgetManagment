import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-sign-up',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-sign-up.component.html',
  styleUrl: './user-sign-up.component.css'
})
export class UserSignUpComponent {

  submitted = false;

   signUpObj:any = {
    "UserName": "",
    "Email": "",
    "Password": ""
   };

   ConfirmPassword = '';

   urlCreate = 'http://localhost:5142/api/User';

   constructor(private http:HttpClient) {}

   onCreate(form: NgForm)
   {

    this.submitted = true;

    if(form.invalid)
    {
      return;
    }
      

    this.http.post(this.urlCreate, this.signUpObj).subscribe( success =>
    {
      console.log("Success", success);
      alert("Sign up Success");
    }, 
    error =>
    {
      console.log("Error", error);
      alert("Sign up Failed");
    }
    );
   };


}
