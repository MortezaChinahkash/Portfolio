import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { TranslationService, SupportedLanguage } from '../../shared/services/translation.service';
import { filter } from 'rxjs/operators';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  // Aktuelle Sprache
  currentLanguage: SupportedLanguage = 'en';
  isProjectPage: boolean = false;
  isMenuOpen: boolean = false;
  isImprint: boolean = false;

  constructor(
    public translationService: TranslationService,
    private router: Router
  ) {}
  
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
  
  // Überprüft, ob wir auf einer Projektseite sind
  private checkCurrentRoute(url: string): void {
    this.isProjectPage = url.includes('/projects/');
    this.isImprint = url.includes('/imprint');
  }
  
  // Methode zum Wechseln der Sprache
  toggleLanguage(code: SupportedLanguage): void {
    if (this.currentLanguage !== code) {
      this.translationService.setLanguage(code);
    }
  }
  
  // Toggle-Methode für den Switch
  switchLanguage(): void {
    const newLang = this.currentLanguage === 'en' ? 'de' : 'en';
    this.toggleLanguage(newLang);
  }
  
  // Hilfsmethode für das Template
  getText(key: keyof TranslationService['translations']['en']): string {
    return this.translationService.t(key);
  }

  // Menü mit Verzögerung schließen
  closeMenuWithDelay(): void {
    setTimeout(() => {
      this.isMenuOpen = false;
    }, 100);
  }

  // Navigation zu Sektionen
  navigateToSection(sectionId: string): void {
    if (this.isProjectPage || this.isImprint) {
      // Wenn wir auf einer Projektseite oder Impressum sind, zur Startseite navigieren
      this.router.navigate(['/'], { fragment: sectionId }).then(() => {
        setTimeout(() => {
          this.scrollToSection(sectionId);
        }, 100);
      });
    } else {
      // Wenn wir bereits auf der Startseite sind, direkt scrollen
      this.scrollToSection(sectionId);
    }
  }

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
