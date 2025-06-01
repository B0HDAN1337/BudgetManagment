import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../overview-page/transaction'; 

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:5142/api/transaction'; 

  constructor(private http: HttpClient) {}

  getLatest(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  add(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  delete(transactionID: number) {
    return this.http.delete(`${this.apiUrl}/${transactionID}`);
  }
  
}
