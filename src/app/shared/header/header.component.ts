import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { TranslationService, SupportedLanguage } from '../../shared/services/translation.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  // Aktuelle Sprache
  currentLanguage: SupportedLanguage = 'en';
  isProjectPage = false;
  isMenuOpen = false;
  
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
}
