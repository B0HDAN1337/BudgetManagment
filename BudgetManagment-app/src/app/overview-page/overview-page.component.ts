import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { TransactionService } from '../services/transaction.service';
import { Wallet } from '../interface/wallet.model';
import { Transaction } from '../interface/transaction.model';



@Component({
  selector: 'app-overview-page',
  standalone: true,      
  imports: [FormsModule, CommonModule],
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.css'
})
export class OverviewPageComponent implements OnInit{
  userData: any;

  wallets: Wallet[] =[];
  transactions: Transaction[] = [];

  transaction = {
    category: '',
    date: '',
    amount: 0,
    currency: ''
  }
  
  constructor(
    private router: Router, 
    private userService: UserService,
  private transactionService: TransactionService) {}

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
    this.loadTransaction();
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

  CreateTransaction() {
    this.transactionService.addTransaction(this.transaction).subscribe( success =>
    {
        console.log("Success transaction", success);
        alert("Success created transaction");
    }, error =>
    {
        console.log("Error transaction", error);
        alert("Error to create transaction");
      });
  }

  loadTransaction() {
    this.transactionService.getUserTransaction().subscribe (transaction =>
    {
      this.transactions = transaction;
      console.log(transaction);
    }, error =>
    {
      console.error("Error loading wallets:", error);
      this.transactions = [];
    })
  }
}
