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
import { Saving } from '../interface/saving.model';
import { SavingService } from '../services/saving.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-wallet-main-page',
  imports: [FormsModule, CommonModule, BaseChartDirective],
  templateUrl: './wallet-main-page.component.html',
  styleUrl: './wallet-main-page.component.css'
})
export class WalletMainPageComponent implements OnInit {

  walletId!: number;
  wallets: any;

  transactions: Transaction[] = [];
  paginatedTransactions: Transaction[] = [];

  isAddTransactionVisible = false;
  isShowMoreTransactionsVisible = false;
  isSaveMoneyOverviewVisible = false;
  isEditTransactionVisible = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private userService: UserService,
    private transactionService: TransactionService,
    private walletService: WalletService,
    private savingService: SavingService) {}

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
      this.newSaving.walletID = this.walletId;
      this.loadWalletsName(this.walletId);
      this.loadTransactionByWallet(this.walletId);
      this.totalIncomeAmount();
      this.loadExpenseByCategory(this.walletId);
      this.loadSavings();
    }

  OpenMenu()
  {
    this.isAddTransactionVisible = true;
  }
  
  CloseMenu()
  {
    this.isAddTransactionVisible = false;
  }

  CreateTransaction(walletID: number) {
    this.transactionService.addTransactionByWallet(walletID, this.transaction).subscribe( success =>
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

  loadTransactionByWallet(walletId: number) {
    this.transactionService.getTransactionsByWallet(walletId).subscribe(transaction =>
    {
      this.transactions = transaction;
      console.log('Transactions: ', transaction);
      this.loadIncomeByDate(walletId);
      this.loadExpenseByDate(walletId);

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
  totalIncome: number = 0;
  totalExpense: number = 0;
  totalBalance: number = 0;

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
  
  selectedSaving: Saving | null = null;

  OpenSavingsOverview(savingID: number){
    this.selectedSaving = this.savings.find(s => s.savingID == savingID) || null;
    this.isSavingsOverviewVisible = true;
  }

  OpenSaveMoneyOverview(){
    this.isSaveMoneyOverviewVisible = true;
  }

  OpenShowMoreTransactions()
  {
    this.isShowMoreTransactionsVisible = true;
  }

  ShowEditTransactionMenu(){
    this.isEditTransactionVisible = true;
  }

  CloseAddSavingsMenu()
  {
    this.isAddSavingsVisible = false;
  }

  CloseSavingsOverview(){
    this.isSavingsOverviewVisible = false;
  }

  CloseSaveMoneyOverview(){
    this.isSaveMoneyOverviewVisible = false;
  }

  CloseShowMoreTransactions()
  {
    this.isShowMoreTransactionsVisible = false;
  }

  CloseEditTransactionMenu(){
    this.isEditTransactionVisible = false;
  }


  barChartData: ChartData<'bar'> = {
  labels: [],
  datasets: [
    {
      data: [],
      label: 'Income by Date',
      backgroundColor: '#42A5F5'
    }
  ]
};

barChartType: ChartType = 'bar';

barChartOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {},
    y: {
      beginAtZero: true
    }
  }
};


  loadIncomeByDate(walletId: number) {
    this.transactionService.GetIncomeByDate(this.walletId).subscribe(data => {
    const labels = data.map(entry => entry.date);
    const amounts = data.map(entry => entry.amount);

    this.barChartData = {
      labels,
      datasets: [
        {
          data: amounts,
          label: 'Income',
          backgroundColor: '#4DB6AC'
        }
      ]
    };
  });
  }

  ExpensebarChartData: ChartData<'bar'> = {
  labels: [],
  datasets: [
    {
      data: [],
      label: 'Expense by Date',
      backgroundColor: '#42A5F5'
    }
  ]
};

ExpensebarChartType: ChartType = 'bar';

ExpensebarChartOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {},
    y: {
      beginAtZero: true,

    }
  }
};


  loadExpenseByDate(walletId: number) {
    this.transactionService.GetExpenseByDate(this.walletId).subscribe(data => {
    const labels = data.map(entry => entry.date);
    const amounts = data.map(entry => Math.abs(entry.amount));

    this.ExpensebarChartData = {
      labels,
      datasets: [
        {
          data: amounts,
          label: 'Expense',
          backgroundColor: '#4DB6AC'
        }
      ]
    };
  });
  }

  expenseByCategoryData: ChartData<'doughnut'> = {
  labels: ['Food', 'HealthCare', 'Travel'],
  datasets: [
    {
      data: [],
      backgroundColor: []
    }
  ]
};

expenseByCategoryOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {top: 0, bottom: 0, left: 0, right: 0 }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label ?? '';
          const value = context.parsed ?? 0;
          return `${label}: ${value.toFixed(2)}%`;
        }
      }
    }
  },
  cutout: '70%'
} as ChartOptions<'doughnut'>;

expenseByCategoryType: ChartType = 'doughnut';

getPercentForCategory(category: string): number {
  const index = this.expenseByCategoryData.labels?.indexOf(category);
  if (index !== -1 && index != null) {
    const value = this.expenseByCategoryData.datasets[0].data[index];
    return Math.round(value * 100) / 100; 
  }
  return 0;
}


generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

loadExpenseByCategory(walletId: number) {
  const categoryColors: { [category: string]: string } = {
  Food: '#FF6F61',
  Healthcare: '#4DB6AC',
  Travel: '#FBC02D'
};
  this.transactionService.GetExpenseByCategory(walletId).subscribe(data => {
    const labels = this.expenseByCategoryData.labels = data.map(d => d.category);
    const percentages = this.expenseByCategoryData.datasets[0].data = data.map(d => d.percentage);
    const colors = data.map(d => categoryColors[d.category] || this.generateRandomColor());


    this.expenseByCategoryData = {
      labels: labels,
      datasets: [
        {
          data: percentages,
          backgroundColor: colors,
        }
      ]
    };
  });
}

filteredTransactions: Transaction[] = [];
fromDate: string = '';
toDate: string = '';

applyFilters() {
    this.filteredTransactions = this.transactions.filter(t => {
      const dateFromMatch = !this.fromDate || new Date(t.date) >= new Date(this.fromDate);
      const dateToMatch = !this.toDate || new Date(t.date) <= new Date(this.toDate);
      return dateFromMatch && dateToMatch;
    });

    this.totalIncome = this.filteredTransactions
      .filter(t => t.type === 0) 
      .reduce((sum, t) => sum + t.convertedAmount, 0);

    this.totalExpense = this.filteredTransactions
      .filter(t => t.type === 1) 
      .reduce((sum, t) => sum + t.convertedAmount, 0);

      this.updateCharts();
  }

  updateCharts() {
  const incomeByDateMap = new Map<string, number>();
  this.filteredTransactions
    .filter(t => t.type === 0)
    .forEach(t => {
      const date = t.date;
      incomeByDateMap.set(date, (incomeByDateMap.get(date) || 0) + t.amount);
    });

  const incomeLabels = Array.from(incomeByDateMap.keys()).sort();
  const incomeAmounts = incomeLabels.map(date => incomeByDateMap.get(date) || 0);

  this.barChartData = {
    labels: incomeLabels,
    datasets: [
      {
        data: incomeAmounts,
        label: 'Income',
        backgroundColor: '#4DB6AC'
      }
    ]
  };

  const expenseByDateMap = new Map<string, number>();
  this.filteredTransactions
    .filter(t => t.type === 1)
    .forEach(t => {
      const date = t.date;
      expenseByDateMap.set(date, (expenseByDateMap.get(date) || 0) + t.amount);
    });

  const expenseLabels = Array.from(expenseByDateMap.keys()).sort();
  const expenseAmounts = expenseLabels.map(date => expenseByDateMap.get(date) || 0);

  this.ExpensebarChartData = {
    labels: expenseLabels,
    datasets: [
      {
        data: expenseAmounts,
        label: 'Expense',
        backgroundColor: '#4DB6AC'
      }
    ]
  };
}

// ---------- Saving ----------

newSaving: Saving = {
  savingID: 0,
  savingName: '',
  description: '',
  goalDate: '',
  amountSave: 0,
  currency: '',
  walletID: 0
};

savings: Saving[] = [];

addSaving() {
  this.savingService.CreateSaving(this.newSaving).subscribe( success =>
  {
    console.log('Successfull created saving', success);
  }, error =>
  {
    console.log('Error create Saving', error);
  }
  )
}

loadSavings() {
  this.savingService.GetSaving().subscribe(data => {
    this.savings = data;
  }
  )
}

deleteSavings(savingID: number) {
  this.savingService.DeleteSavings(savingID).subscribe(success =>
  {
    console.log("Success Deleted Saving", success);
   this.savings = this.savings.filter(s => s.savingID !== savingID);
    this.loadSavings();
  }, error =>
  {
    console.log("Error Deleted Saving", error);
  }
  )
}

selectedCurrency: string = 'All';

resetFilters() {
  this.selectedCategory = 'All Categories';
  this.selectedCurrency = 'All';
  this.fromDate = '';
  this.toDate = '';
  this.filteredTransactions = [...this.transactions];
  this.updatePagination();
}
}
