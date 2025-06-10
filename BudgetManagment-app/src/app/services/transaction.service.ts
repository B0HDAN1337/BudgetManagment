import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../interface/transaction.model'; 

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionUrl = 'http://localhost:5142/api/transactions'; 

  
  constructor(private http: HttpClient) {}

  getUserTransaction(): Observable<Transaction[]> {
    const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token is missing');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<Transaction[]>(this.transactionUrl, {headers});
  }

 addTransaction(transaction: Partial<Transaction>): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionUrl, transaction);
  }
  addTransactionByWallet(walletID: number, transaction: Partial<Transaction>): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.transactionUrl}/wallet/${walletID}/transaction`, transaction);
  }

  delete(transactionID: number) {
    return this.http.delete(`${this.transactionUrl}/${transactionID}`);
  }

  getTransactionsByWallet(walletID: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`http://localhost:5142/api/transactions/wallet/${walletID}`);
  }
  
  getWalletIncomeTotal(walletID: number): Observable<{income: number, expense: number}> {
    return this.http.get<{income: number, expense: number}>(`http://localhost:5142/api/transactions/wallet/${walletID}/totals`);
  }

  updateTransaction(transactionID: number, transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.transactionUrl}/${transactionID}`, transaction);
  }

  deleteTransactionById(transactionID: number){
    return this.http.delete(`http://localhost:5142/api/transactions/${transactionID}`);
  }

  GetIncomeByDate(walletID: number): Observable<{date: string, amount: number}[]> {
    return this.http.get<{date: string, amount: number}[]>(`${this.transactionUrl}/wallet/${walletID}/income-by-date`);
  }

  GetExpenseByDate(walletID: number): Observable<{date: string, amount: number}[]> {
    return this.http.get<{date: string, amount: number}[]>(`${this.transactionUrl}/wallet/${walletID}/expense-by-date`);
  }

  GetExpenseByCategory(walletID: number) {
    return this.http.get<{ category: string, amount: number, percentage: number }[]>(`${this.transactionUrl}/wallet/${walletID}/expense-by-category`);
  }
}
