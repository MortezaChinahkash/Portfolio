/**
 * @fileoverview Application bootstrap entry point
 * @author Morteza Chinahkash
 * @version 1.0.0
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Bootstrap the Angular application with the root component and configuration
 * Starts the portfolio application and handles any bootstrap errors
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
