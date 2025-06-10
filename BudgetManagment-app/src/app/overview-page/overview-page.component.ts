import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { TransactionService } from '../services/transaction.service';
import { Wallet } from '../interface/wallet.model';
import { Transaction } from '../interface/transaction.model';
import { WalletService } from '../services/wallet.service';



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
  paginatedTransactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];

  transaction = {
    category: '',
    date: '',
    amount: 0,
    currency: '',
    walletID: 0,
    type: 0
  }
  
  constructor(
    private router: Router, 
    private userService: UserService,
    private walletService: WalletService,
  private transactionService: TransactionService) {}

  isAddTransactionVisible = false;
  isShowMoreTransactionsVisible = false;
  isEditTransactionVisible = false;

  OpenMenu()
  {
    this.isAddTransactionVisible = true;
  }

  OpenShowMoreTransactions()
  {
    this.isShowMoreTransactionsVisible = true;
  }

  ShowEditTransactionMenu(){
    this.isEditTransactionVisible = true;
  }

  CloseMenu()
  {
    this.isAddTransactionVisible = false;
  }

  CloseShowMoreTransactions()
  {
    this.isShowMoreTransactionsVisible = false;
  }

  CloseEditTransactionMenu(){
    this.isEditTransactionVisible = false;
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
    this.walletService.getUserWallet().subscribe (wallet =>
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
        this.ngOnInit();
        this.isAddTransactionVisible = false;
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
      this.updatePagination();
      console.log(transaction);
    }, error =>
    {
      console.error("Error loading wallets:", error);
      this.transactions = [];
    })
  }

  dropdownOpen = false;
  selectedCategory = 'All Categories';

  getCategoryImage(category: string, color: string = 'violet'): string {
    switch (category) {
      case 'Food': return `/assets/icons/food-${color}.png`;
      case 'Home': return `/assets/icons/home-${color}.png`;
      case 'Healthcare': return `/assets/icons/healthcare-${color}.png` ;
      case 'Travel': return `/assets/icons/travel-${color}.png`;
      case 'Income': return `/assets/icons/income-${color}.png`;
      default: return category;
    }
  }

isActiveCategory(category: string): boolean {
  return this.selectedCategory === category;
}


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

currentPage: number = 1;
pageSize: number = 5;
totalPages: number = 0;
pages: number[] = [];

updatePagination() {
  this.totalPages = Math.ceil(this.transactions.length / this.pageSize);
  this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.paginatedTransactions = this.filteredTransactions.slice(startIndex, endIndex);
}

goToPage(page: number) {
  this.currentPage = page;
  this.updatePagination();
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updatePagination();
  }
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePagination();
  }
}

goToWallet(walletId: number) {
  this.router.navigate(['/wallet', walletId]);
}

deleteTransaction(transactionID: number) {
  this.transactionService.deleteTransactionById(transactionID).subscribe(success =>
  {
    console.log("Success deleted Transaction", success);
    this.loadTransaction();
  }, error => 
  {
    console.log("Error delete Transaction", error);
  }
  )
}


selectedCurrency: string = 'All';
fromDate: string = '';
toDate: string = '';

applyFilters() {
  this.filteredTransactions = this.transactions.filter(t => {
    const categoryMatch = this.selectedCategory === 'All Categories' || t.category === this.selectedCategory;
    const currencyMatch = this.selectedCurrency === 'All' || t.currency === this.selectedCurrency;
    const dateFromMatch = !this.fromDate || new Date(t.date) >= new Date(this.fromDate);
    const dateToMatch = !this.toDate || new Date(t.date) <= new Date(this.toDate);
    return categoryMatch && currencyMatch && dateFromMatch && dateToMatch;
  });
  this.updatePagination();
}

resetFilters() {
  this.selectedCategory = 'All Categories';
  this.selectedCurrency = 'All';
  this.fromDate = '';
  this.toDate = '';
  this.filteredTransactions = [...this.transactions];
  this.updatePagination();
}

}
