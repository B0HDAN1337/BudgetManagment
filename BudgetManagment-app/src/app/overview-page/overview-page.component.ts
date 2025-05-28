import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { Wallet } from '../interface/wallet.model';

@Component({
  selector: 'app-overview-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.css'
})
export class OverviewPageComponent implements OnInit{
  userData: any;
  wallets: Wallet[] =[];
  constructor(private router: Router, private userService: UserService) {}

  isMenuVisible = false;

  OpenMenu()
  {
    this.isMenuVisible = true;
  }

  CloseMenu()
  {
    this.isMenuVisible = false;
  }

  OpenCreateMenu()
  {
    this.router.navigate(['/wallet-creation']); 
  }

  ngOnInit() {
    this.userService.getUserData().subscribe( data =>
    {
      this.userData = data;
    }, error =>
    {
      console.log("Error transfer data", error);
    }
    )

    this.loadWallets();
  }

  loadWallets() {
    this.userService.getUserWallet().subscribe (wallet =>
    {
      this.wallets = wallet;
      console.log(wallet);
    }, error => 
    {
      console.error('Error loading wallets:', error);
      this.wallets = [];
    }
    )
  }

}
