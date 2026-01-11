import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { MAINSTREAM_DATA, CLASSIC_DATA, SupplyChainIndustry, ClassicCategory } from './data';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private http = inject(HttpClient);
  
  // CONFIGURATION:
  // Set to 'false' to connect to the real Spring Boot Backend.
  // Set to 'true' to use the embedded mock data (for demo/preview).
  private useMock = true; 
  
  // Spring Boot API Base URL
  private apiUrl = 'http://localhost:8080/api';

  getMainstreamData(): Observable<SupplyChainIndustry[]> {
    if (this.useMock) {
      // Simulate network delay for realistic feel
      return of(MAINSTREAM_DATA).pipe(delay(300));
    }
    
    return this.http.get<SupplyChainIndustry[]>(`${this.apiUrl}/stocks/mainstream`).pipe(
      catchError(err => {
        console.warn('Backend API connection failed, falling back to mock data.', err);
        return of(MAINSTREAM_DATA);
      })
    );
  }

  getClassicData(): Observable<ClassicCategory[]> {
    if (this.useMock) {
      return of(CLASSIC_DATA).pipe(delay(300));
    }

    return this.http.get<ClassicCategory[]>(`${this.apiUrl}/stocks/classic`).pipe(
      catchError(err => {
        console.warn('Backend API connection failed, falling back to mock data.', err);
        return of(CLASSIC_DATA);
      })
    );
  }
}