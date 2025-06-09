import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Saving } from '../interface/saving.model';

@Injectable({
  providedIn: 'root'
})
export class SavingService {
    private SavingUrl = 'http://localhost:5142/api/Saving';

  constructor(private http: HttpClient) {}

  CreateSaving(saving: Saving): Observable<Saving> {
    return this.http.post<Saving>(this.SavingUrl, saving);
  }

  GetSaving(): Observable<Saving[]> {
    return this.http.get<Saving[]>(this.SavingUrl);
  }
   
  DeleteSavings(savingID: number): Observable<Saving[]> {
    return this.http.delete<Saving[]>(`${this.SavingUrl}/${savingID}`);
  }
   
}