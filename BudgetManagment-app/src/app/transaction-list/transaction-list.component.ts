import { Component, Input } from '@angular/core';
import { Transaction } from '../overview-page/transaction'; 
import { TransactionCardComponent } from '../transaction-card/transaction-card.component';
import { TransactionService } from '../services/transaction.service';


@Component({
  selector: 'app-transaction-list',
  imports: [TransactionCardComponent],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  onDelete(transactionID: number) {
    console.log('Deleting transaction:', transactionID);
    this.transactionService.delete(transactionID).subscribe(() => {
      this.transactions = this.transactions.filter(t => t.transactionID !== transactionID);
    });
  }
}
