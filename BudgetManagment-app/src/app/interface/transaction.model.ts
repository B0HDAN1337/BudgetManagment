export interface Transaction {
    transactionID: number;
    userID: number;
    category: string;
    amount: number;
    date: string;
    currency: string;
    walletID: number;
}