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

    //bool query to check if button already pushed
  isSubmitted = false;

  WalletObj: any =
  {
  "WalletName": "",
  "Description": "",
  "Currency": ""
  }
  
  //url requests to database server 
  private urlCreateWallet = 'http://localhost:5142/api/Wallet';
  private urlCheckWallet = 'http://localhost:5142/api/Wallet/exists';

  constructor(private http: HttpClient) {}

   //When click button to Create wallet
  OnCreateWallet(form: NgForm)
  {

    this.isSubmitted = true;

    if(form.invalid)
    {
      return;
    }

    this.CheckWalletExist(this.WalletObj.WalletName).subscribe(exist => 
    {
      if(exist)
      {
        console.log(exist);
        alert("Wallet already exist");
      } else
      {
        this.CreatingWallet();
      }
    }
    );
  }

  // http get request to validate if wallet with walletname exist
  CheckWalletExist(walletname: string)
  {
    return this.http.get(this.urlCheckWallet, {
      params: {
        walletname: this.WalletObj.WalletName
      }
    });
  }


  // http post request for create new wallet
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
