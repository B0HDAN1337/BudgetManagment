import { Component, OnInit, ErrorHandler, Type } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TransactionService } from '../services/transaction.service';
import { WalletService } from '../services/wallet.service';
import { Wallet } from '../interface/wallet.model';
import { ActivatedRoute } from '@angular/router';
import { Transaction, TransactionType } from '../interface/transaction.model';

@Component({
  selector: 'app-wallet-main-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './wallet-main-page.component.html',
  styleUrl: './wallet-main-page.component.css'
})
export class WalletMainPageComponent implements OnInit {

  walletId!: number;
  wallets: any;

  transactions: Transaction[] = [];

  isAddTransactionVisible = false;
  isShowMoreTransactionsVisible = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private userService: UserService,
    private transactionService: TransactionService,
    private walletService: WalletService) {}

  transaction = {
      category: '',
      date: '',
      amount: 0,
      currency: '',
      walletID: 0,
      type: 0
    }

    ngOnInit() {
      this.walletId = +this.route.snapshot.paramMap.get('id')!;
      this.transaction.walletID = this.walletId;
      this.loadWalletsName(this.walletId);
      this.loadTransactionByWallet(this.walletId);
      this.totalIncomeAmount();
    }

  OpenMenu()
  {
    this.isAddTransactionVisible = true;
  }
  
  CloseMenu()
  {
    this.isAddTransactionVisible = false;
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

  loadTransactionByWallet(walletId: number) {
    this.transactionService.getTransactionsByWallet(walletId).subscribe(transaction =>
    {
      this.transactions = transaction;
      console.log('Transactions: ', transaction);
    }, error => {
      console.error('Error loading transactions: ', error);
      this.transactions = [];
    }
    )
  }

  loadWalletsName(id: number) {
    this.walletService.getWalletDataById(id).subscribe(wallet =>
    {
      this.wallets = wallet;
      console.log(wallet);
    }, error =>
    {
      console.error("Error loading wallets: ", error);
      this.wallets = [];
    }
    )
  }

  totalIncome: number = 0;
  totalExpense: number = 0;

  totalIncomeAmount() {
    this.transactionService.getWalletIncomeTotal(this.walletId).subscribe( total =>
    {
      this.totalIncome = total.income;
      this.totalExpense = total.expense;
    }, error =>
    {
      console.error('Error whee load: ', error);
    })
  }

  isAddSavingsVisible = false;
  isSavingsOverviewVisible = false;

  OpenAddSavingsMenu(){
    this.isAddSavingsVisible = true;
  }
  
  OpenSavingsOverview(){
    this.isSavingsOverviewVisible = true;
  }

  CloseAddSavingsMenu()
  {
    this.isAddSavingsVisible = false;
  }

  CloseSavingsOverview(){
    this.isSavingsOverviewVisible = false;
  }

}
