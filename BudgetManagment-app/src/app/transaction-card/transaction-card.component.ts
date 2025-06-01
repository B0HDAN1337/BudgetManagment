import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../overview-page/transaction';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../services/transaction.service';


@Component({
  selector: 'app-transaction-card',
  imports: [CommonModule, MatCardModule],
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.css']
})
export class TransactionCardComponent {
  @Input() transaction!: Transaction;
  @Output() deleteTransactionEvent = new EventEmitter<number>();
  @Output() transactionDeleted = new EventEmitter<number>();
  constructor(private transactionService: TransactionService) {}


  getCategoryIcon(categoryId: number): string {
    
    switch(categoryId) {
      case 1: return 'assets/icons/food-green.png';
      case 2: return 'assets/icons/healthcare-green.png';
      case 3: return 'assets/icons/income-green.png';
      case 4: return 'assets/icons/travel-green.png';
      default: return 'assets/icons/default.svg';
    }
  }

  getCategoryName(categoryId: number): string {
    switch(categoryId) {
      case 1: return 'Food';
      case 2: return 'Healthcare';
      case 3: return 'Income';
      case 4: return 'Travel';
      case 5: return 'Travel';
      default: return 'Unknown';
    }
  }

  editTransaction() {
    console.log('Edit transaction', this.transaction);
  }

  deleteTransaction() {
    console.log('Delete transaction', this.transaction);
    if (!this.transaction?.transactionID) return;
  
    this.transactionService.delete(this.transaction.transactionID).subscribe({
      next: () => {
        console.log(`Transaction ${this.transaction.transactionID} deleted`);
        this.transactionDeleted.emit(this.transaction.transactionID);
      },
      error: err => {
        console.error('Failed to delete transaction', err);
      }
    });
  }
  

  

}
