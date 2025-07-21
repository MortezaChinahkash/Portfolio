import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { TranslationService, SupportedLanguage } from '../../shared/services/translation.service';
import { filter } from 'rxjs/operators';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  currentLanguage: SupportedLanguage = 'en';
  isMenuOpen: boolean = false;
  isImprint: boolean = false;

  /**
   * Initializes the FooterComponent with required services
   * @param {TranslationService} translationService - Service for handling translations
   * @param {Router} router - Angular router service for navigation
   */
constructor(
    public translationService: TranslationService,
    private router: Router
  ) {}
  
  /**
   * Angular lifecycle hook - initializes the component after dependency injection
   * Sets up language subscription and route monitoring
   * @returns {void}
   */
  ngOnInit(): void {
    // Sprache aus dem Service übernehmen
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLanguage = lang;
    });
    
    // Überprüfen der aktuellen Route
    this.checkCurrentRoute(this.router.url);
    
    // Auf Routenänderungen hören
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkCurrentRoute(event.url);
    });
  }
  
  /**
   * Checks the current route to determine if we're on the imprint page
   * @private
   * @param {string} url - The current URL
   * @returns {void}
   */
  // Überprüft, ob wir auf einer Projektseite sind
  private checkCurrentRoute(url: string): void {
    this.isImprint = url.includes('/imprint');
  }
  
  /**
   * Toggles the language if different from current language
   * @param {SupportedLanguage} code - The language code to switch to
   * @returns {void}
   */
  // Methode zum Wechseln der Sprache
  toggleLanguage(code: SupportedLanguage): void {
    if (this.currentLanguage !== code) {
      this.translationService.setLanguage(code);
    }
  }
  
  /**
   * Switches between English and German languages
   * @returns {void}
   */
  // Toggle-Methode für den Switch
  switchLanguage(): void {
    const newLang = this.currentLanguage === 'en' ? 'de' : 'en';
    this.toggleLanguage(newLang);
  }
  
  /**
   * Helper method to get translated text for templates
   * @param {keyof TranslationService['translations']['en']} key - The translation key
   * @returns {string} The translated text
   */
  // Hilfsmethode für das Template
  getText(key: keyof TranslationService['translations']['en']): string {
    return this.translationService.t(key);
  }

  /**
   * Closes the mobile menu after a short delay
   * @returns {void}
   */
  // Menü mit Verzögerung schließen
  closeMenuWithDelay(): void {
    setTimeout(() => {
      this.isMenuOpen = false;
    }, 100);
  }

  /**
   * Navigates to a specific section on the homepage
   * @param {string} sectionId - The ID of the section to navigate to
   * @returns {void}
   */
  // Navigation zu Sektionen
  navigateToSection(sectionId: string): void {
    // Immer zur Startseite navigieren, da das Footer auf allen Seiten ist
    this.router.navigate(['/'], { fragment: sectionId }).then(() => {
      setTimeout(() => {
        this.scrollToSection(sectionId);
      }, 100);
    });
  }

  /**
   * Scrolls smoothly to a specific section by ID
   * @private
   * @param {string} sectionId - The ID of the section to scroll to
   * @returns {void}
   */
  // Scrolling zu einer Sektion
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
