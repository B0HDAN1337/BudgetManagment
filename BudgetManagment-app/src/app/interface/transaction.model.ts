export enum TransactionType {
  Expense = 0,
  Income = 1
}

export interface Transaction {
    transactionID: number;
    userID: number;
    category: string;
    type: number;
    amount: number;
    convertedAmount: number;
    date: string;
    currency: string;
    walletID: number;
}