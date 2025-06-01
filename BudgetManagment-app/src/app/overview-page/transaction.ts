export interface Transaction {
    transactionID?: number;
    userID: number;
    categoryID: number;
    amount: number;
    date: string;    
    currency: string;
  }
  