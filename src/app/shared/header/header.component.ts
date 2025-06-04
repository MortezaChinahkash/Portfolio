import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, SupportedLanguage } from '../../shared/services/translation.service';

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
  
  constructor(public translationService: TranslationService) {}
  
  ngOnInit(): void {
    // Sprache aus dem Service übernehmen
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLanguage = lang;
    });
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
