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
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLanguage = lang;
    });
    
    this.checkCurrentRoute(this.router.url);
    
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
  private checkCurrentRoute(url: string): void {
    this.isImprint = url.includes('/imprint');
  }
  
  /**
   * Toggles the language if different from current language
   * @param {SupportedLanguage} code - The language code to switch to
   * @returns {void}
   */
  toggleLanguage(code: SupportedLanguage): void {
    if (this.currentLanguage !== code) {
      this.translationService.setLanguage(code);
    }
  }
  
  /**
   * Switches between English and German languages
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
   * Closes the mobile menu after a short delay
   * @returns {void}
   */
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
  navigateToSection(sectionId: string): void {
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
