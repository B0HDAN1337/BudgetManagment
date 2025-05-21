import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-overview',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent implements OnInit {
  userData: any;

  isMenuVisible = false;

  textDelete: string = '';

  constructor(private userService: UserService, private http: HttpClient, private authService: AuthService) {}

  OpenMenu() {
    this.isMenuVisible = true;
  }

  CloseMenu() {
    this.isMenuVisible = false;
  }

  ngOnInit(){
    this.userService.getUserData().subscribe(data =>
      {
        this.userData = data;
        console.log(this.userData)
      }, error =>
      {
        console.log("Error transfer data", error);
      }
      
      )
    }

    btnDelete()
    {
      if(this.textDelete !== 'DELETE')
      {
        alert("enter DELETE");
      } else
      {
        this.userService.deleteUser().subscribe(success =>
          {
            console.log("User deleted", success)
            this.authService.logout();
    
          }, error =>
          {
            console.log("User delete Error", error)
          }
          )
      }
      
    }
}
