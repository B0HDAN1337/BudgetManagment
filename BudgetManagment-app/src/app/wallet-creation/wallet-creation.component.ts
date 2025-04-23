import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wallet-creation',
  imports: [FormsModule, CommonModule],
  templateUrl: './wallet-creation.component.html',
  styleUrl: './wallet-creation.component.css'
})
export class WalletCreationComponent {

  WalletObj: any =
  {
  "WalletName": "",
  "Description": "",
  "Currency": ""
  }

  urlCreateWallet = 'http://localhost:5142/api/Wallet';

  constructor(private http: HttpClient) {}

  OnCreateWallet()
  {
    this.CreatingWallet();
  }


  CreatingWallet()
  {
    this.http.post(this.urlCreateWallet, this.WalletObj).subscribe( success =>
      {
        console.log("Success wallet", success);
        alert("Success created wallet");
      }, error =>
      {
        console.log("Error wallet", error);
        alert("Error to create wallet");
      });
  }
}
