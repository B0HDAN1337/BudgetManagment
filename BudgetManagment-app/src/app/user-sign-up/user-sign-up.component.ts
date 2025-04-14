import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-sign-up',
  imports: [FormsModule],
  templateUrl: './user-sign-up.component.html',
  styleUrl: './user-sign-up.component.css'
})
export class UserSignUpComponent {

   signUpObj:any = {
    "UserName": "",
    "Email": "",
    "Password": ""
   };

   urlCreate = 'http://localhost:5142/api/User';

   constructor(private http:HttpClient) {}


   onCreate()
   {
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
