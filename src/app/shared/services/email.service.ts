/**
 * @fileoverview Email service for handling contact form submissions
 * @author Morteza Chinahkash
 * @version 1.0.0
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interface defining the structure of contact form data
 * @interface ContactFormData
 */
export interface ContactFormData {
  /** Name of the person contacting */
  name: string;
  /** Email address for contact */
  email: string;
  /** Message content */
  message: string;
}

/**
 * Service responsible for handling email operations and contact form submissions
 * @class EmailService
 * @injectable
 */
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  /** API endpoint for sending emails */
  private apiUrl = 'https://www.m-chinahkash.de/sendMail.php';

  /**
   * Initializes the email service
   * @param {HttpClient} http - Angular HTTP client for API requests
   * @constructor
   */
  constructor(private http: HttpClient) {}

  /**
   * Sends an email using the contact form data
   * @param {ContactFormData} formData - The form data to send
   * @returns {Observable<any>} Observable with the API response
   */
  sendEmail(formData: ContactFormData): Observable<any> {
    return this.http.post(this.apiUrl, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
