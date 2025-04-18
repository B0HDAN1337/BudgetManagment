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

  //bool query to check if button already pushed
  submitted = false;

   signUpObj:any = {
    "UserName": "",
    "Email": "",
    "Password": ""
   };

   //Check if passwords do match 
   ConfirmPassword = '';

   //url requests to database server 
   private urlCreate = 'http://localhost:5142/api/User';
   private urlCheckUser = 'http://localhost:5142/api/User/exists';

   constructor(private http:HttpClient) {}

   //When click button to Sign up
   onCreate(form: NgForm)
   {
    
    this.submitted = true;

    if(form.invalid)
    {
      return;
    }
      
    this.onCheckUser(this.signUpObj.UserName, this.signUpObj.Email).subscribe( exist =>
    {
      if (exist)
      {
        console.log(exist);
        alert("User exist with this username or email"); 
      } else
      {
        this.registerUser();
      }
    });

   };

   // http get request to validate if user with username and email exist
   onCheckUser(username: string, email: string)
   {
    return this.http.get(this.urlCheckUser, {
      params: {
        username: this.signUpObj.UserName,
        email: this.signUpObj.Email
      }
    });
   }

   // http post request for add new user
   registerUser()
   {

    this.http.post(this.urlCreate, this.signUpObj).subscribe( success =>
      {
        console.log("Success added", success);
        alert("Sign up success");
      }, error =>
      {
        
        console.log("Error add", error);
        alert("Sign up failed");
      })
   }

}
