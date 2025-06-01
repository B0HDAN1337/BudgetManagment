import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { Wallet } from '../interface/wallet.model';
import { TransactionService } from '../services/transaction.service';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { TransactionCardComponent } from '../transaction-card/transaction-card.component';
import { Transaction } from './transaction'; 


@Component({
  selector: 'app-overview-page',
  standalone: true,      
  imports: [FormsModule, CommonModule, TransactionListComponent, TransactionCardComponent],
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.css'
})
export class OverviewPageComponent implements OnInit{
  userData: any;

  wallets: Wallet[] =[];
  transactions: Transaction[] = [];

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
    this.loadTransactions();
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

  loadTransactions() {
    this.transactionService.getLatest().subscribe(data => {
      this.transactions = data;
    });

  }
    
  onAddTransaction(form: any) {
    const newTx: Transaction = {
      userID: 1, 
      categoryID: +form.value.CategoryID,
      amount: +form.value.Amount,
      date: form.value.Date,
      currency: form.value.Currency
    };
  
    this.transactionService.add(newTx).subscribe(() => {
      this.loadTransactions();       
      this.CloseMenu();              
      form.resetForm();              
    });
  }

  removeTransactionFromList(deletedId: number) {
    console.log('Removing transaction with ID:', deletedId);
    this.transactions = this.transactions.filter(tx => tx.transactionID !== deletedId);
  }
  

  

}
