import { Component, OnInit, HostListener } from '@angular/core';
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
    currency: '',
    walletID: 0
  }
  
  constructor(
    private router: Router, 
    private userService: UserService,
  private transactionService: TransactionService) {}

  isAddTransactionVisible = false;
  isShowMoreTransactionsVisible = false;

  OpenMenu()
  {
    this.isAddTransactionVisible = true;
  }

  OpenShowMoreTransactions()
  {
    this.isShowMoreTransactionsVisible = true;
  }

  CloseMenu()
  {
    this.isAddTransactionVisible = false;
  }

  CloseShowMoreTransactions()
  {
    this.isShowMoreTransactionsVisible = false;
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

  dropdownOpen = false;
  selectedCategory = 'All Categories';

  categories = [
  { label: 'Food', icon: '/BudgetManagment-app/src/icons/food-violet.png' },
  { label: 'Home', icon: '/BudgetManagment-app/src/icons/home-violet.png' },
  { label: 'Healthcare', icon: '/BudgetManagment-app/src/icons/healthcare-violet.png' },
  { label: 'Travel', icon: '/BudgetManagment-app/src/icons/travel-violet.png' },
  { label: 'Income', icon: '/BudgetManagment-app/src/icons/income-violet.png' }
];

toggleDropdown(event: Event): void {
  this.dropdownOpen = !this.dropdownOpen;
  event.stopPropagation();
}

selectCategory(category: any): void {
  this.selectedCategory = category.label;
  this.dropdownOpen = false;
}

@HostListener('document:click', ['$event'])
closeDropdown(event: Event): void {
  this.dropdownOpen = false;
}


getCurrencySymbol(currency: string): string {
  switch (currency) {
    case 'USD': return '$';
    case 'EUR': return '€';
    case 'PLN': return 'zł';
    default: return currency;
  }
}
}
