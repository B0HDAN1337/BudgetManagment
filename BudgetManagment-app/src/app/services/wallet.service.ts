import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet } from '../interface/wallet.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
    private WalletUrl = 'http://localhost:5142/api/Wallet';

  constructor(private http: HttpClient) {}

    getWalletDataById(id: number): Observable<Wallet[]> {
      return this.http.get<Wallet[]>(`${this.WalletUrl}/${id}`);
    }
    
    getUserWallet(): Observable<Wallet[]> {
      return this.http.get<Wallet[]>(this.WalletUrl);
    }
}