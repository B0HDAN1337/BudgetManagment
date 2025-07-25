import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from '../interface/wallet.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getData = 'http://localhost:5142/api/User/getdata';
  private userDelete = 'http://localhost:5142/api/User/delete';
  private userWallet = 'http://localhost:5142/api/Wallet';
  private userUrl = 'http://localhost:5142/api/User';
  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is missing');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.getData, { headers });
  }

  
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is missing');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(this.userDelete, { headers });
  }

  updateUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is missing');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.userUrl}/update`, userData, {headers});
  }

}
