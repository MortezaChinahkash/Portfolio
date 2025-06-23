import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'https://www.m-chinahkash.de/sendMail.php'; // Passen Sie die URL entsprechend an

  constructor(private http: HttpClient) {}

  sendEmail(formData: ContactFormData): Observable<any> {
    return this.http.post(this.apiUrl, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
