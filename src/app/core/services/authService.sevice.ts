import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'https://api-staging-hesburger.freya.cloud';


  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`,
      { username, password }

    );
  }

  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  saveExparitionDate(hoursAhead: number) {
    const now = new Date();
    console.log(now);
    const futureDate = new Date(now.getTime() + hoursAhead * 1000);
    console.log(futureDate);
    localStorage.setItem('ExpiredDate', futureDate.toISOString());
  }

  isDateValidAndNotExpired(): boolean {
    const dateString = localStorage.getItem("ExpiredDate");

    if (!dateString) {
      return false;
    }
    const savedDate = new Date(dateString);

    if (isNaN(savedDate.getTime())) {
      return false;
    }

    const now = new Date();

    return savedDate > now;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  clearToken() {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}