/**
 * @fileoverview Header navigation component with language switching and mobile menu
 * @author Morteza Chinahkash
 * @version 1.0.0
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { TranslationService, SupportedLanguage } from '../../shared/services/translation.service';
import { filter } from 'rxjs/operators';
import { RouterModule } from '@angular/router'; 

/**
 * Header component providing navigation, language switching, and mobile menu functionality
 * @class HeaderComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  /** Current selected language */
  currentLanguage: SupportedLanguage = 'en';
  
  /** Flag indicating if currently on a project detail page */
  isProjectPage: boolean = false;
  
  /** Flag controlling mobile menu visibility */
  isMenuOpen: boolean = false;
  
  /** Flag indicating if currently on the imprint page */
  isImprint: boolean = false;

  /**
   * Initializes the header component with required services
   * @param {TranslationService} translationService - Service for handling translations
   * @param {Router} router - Angular router for navigation management
   * @constructor
   */
  constructor(
    public translationService: TranslationService,
    private router: Router
  ) {}
  
  /**
   * Component initialization lifecycle hook
   * Sets up language subscription and route monitoring
   * @returns {void}
   */
  ngOnInit(): void {
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLanguage = lang;
    });
    
    this.checkCurrentRoute(this.router.url);
    
    this.router.events.pipe(
      /**
       * Filters router events to only process NavigationEnd events
       * @param {Event} event - The router event
       * @returns {boolean} True if event is NavigationEnd
       */
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkCurrentRoute(event.url);
    });
  }
  
  /**
   * Überprüft, ob die aktuelle Route eine Projektseite oder das Impressum ist
   * @private
   * @param {string} url - Die aktuelle URL
   * @returns {void}
   */
  private checkCurrentRoute(url: string): void {
    this.isProjectPage = url.includes('/projects/');
    this.isImprint = url.includes('/imprint');
  }
  
  /**
   * Toggles the application language
   * @param {SupportedLanguage} code - The language code to switch to
   * @returns {void}
   */
  toggleLanguage(code: SupportedLanguage): void {
    if (this.currentLanguage !== code) {
      this.translationService.setLanguage(code);
    }
  }
  
  /**
   * Switches between German and English languages
   * @returns {void}
   */
  switchLanguage(): void {
    const newLang = this.currentLanguage === 'en' ? 'de' : 'en';
    this.toggleLanguage(newLang);
  }
  
  /**
   * Helper method to get translated text for templates
   * @param {keyof TranslationService['translations']['en']} key - The translation key
   * @returns {string} The translated text
   */
  getText(key: keyof TranslationService['translations']['en']): string {
    return this.translationService.t(key);
  }

  /**
   * Closes the mobile menu with a slight delay for smooth animation
   * @returns {void}
   */
  closeMenuWithDelay(): void {
    setTimeout(() => {
      this.isMenuOpen = false;
    }, 100);
  }
  /**
   * Navigates to a specific section, handling both home page and external pages
   * @param {string} sectionId - The ID of the section to navigate to
   * @returns {void}
   */
  navigateToSection(sectionId: string): void {
    if (this.isProjectPage || this.isImprint) {
      this.navigateHomeAndScroll(sectionId);
    } else {
      this.scrollToSection(sectionId);
    }
  }

  /**
   * Navigates to home page and then scrolls to the specified section
   * @private
   * @param {string} sectionId - The ID of the section to scroll to after navigation
   * @returns {void}
   */
  private navigateHomeAndScroll(sectionId: string): void {
    this.router.navigate(['/'], { fragment: sectionId }).then(() => {
      setTimeout(() => {
        this.scrollToSection(sectionId);
      }, 100);
    });
  }

  /**
   * Scrolls to a specific section on the current page with smooth animation
   * @private
   * @param {string} sectionId - The ID of the section to scroll to
   * @returns {void}
   */
  private scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
