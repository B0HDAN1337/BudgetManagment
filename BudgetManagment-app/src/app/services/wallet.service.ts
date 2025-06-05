import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet } from '../interface/wallet.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
    private WalletUrl = 'http://localhost:5142/api/wallets';

    
    
}