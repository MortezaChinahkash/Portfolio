/**
 * @fileoverview Main application component and entry point
 * @author Morteza Chinahkash
 * @version 1.0.0
 */

import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { TranslationService } from './shared/services/translation.service';
import { filter } from 'rxjs/operators';
import * as AOS from 'aos';

/**
 * Root application component managing routing and global state
 * @class AppComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  /** Application title */
  title = 'Portfolio';
  
  /**
   * Initializes the main application component
   * @param {TranslationService} translationService - Service for handling translations
   * @param {Router} router - Angular router for navigation management
   * @constructor
   */
  constructor(private translationService: TranslationService, private router: Router) {}
  
  /**
   * Component initialization lifecycle hook
   * Sets up language initialization and route monitoring
   * @returns {void}
   */  ngOnInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      offset: 50,
      disable: false
    });
    
    this.translationService.initLanguage();// Überprüfe beim Start
    this.checkIfProjectPage(this.router.url);
    
    this.router.events.pipe(
      /**
       * Filters router events to only process NavigationEnd events
       * @param {Event} event - The router event
       * @returns {boolean} True if event is NavigationEnd
       */
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkIfProjectPage(event.url);
      
      if (!event.url.includes('#')) {
        window.scrollTo(0, 0);
      }
      
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    });
  }

  /**
   * Checks if the current URL is a project page and updates body classes accordingly
   * @private
   * @param {string} url - The current URL to check
   * @returns {void}
   */
  private checkIfProjectPage(url: string) {
    const isProjectPage = url.includes('/projects/');
    
    if (isProjectPage) {
      document.body.classList.add('project-page');
    } else {
      document.body.classList.remove('project-page');
    }
  }
}
