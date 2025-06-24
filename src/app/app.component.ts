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
    // Initialize AOS animations
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 120
    });
    
    // Initialisiere Sprache beim App-Start
    this.translationService.initLanguage();

    // Überprüfe beim Start
    this.checkIfProjectPage(this.router.url);    // Reagiere auf Routenwechsel
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkIfProjectPage(event.url);
      
      // Automatisch nach oben scrollen bei Routenänderungen
      // aber nicht bei Fragment-Navigation (Links wie #about-me)
      if (!event.url.includes('#')) {
        window.scrollTo(0, 0);
      }
    });
  }

  private checkIfProjectPage(url: string) {
    const isProjectPage = url.includes('/projects/');
    
    // Body-Klasse setzen oder entfernen
    if (isProjectPage) {
      document.body.classList.add('project-page');
    } else {
      document.body.classList.remove('project-page');
    }
  }
}
