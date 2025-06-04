import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Einfaches Interface für Sprachen
interface Language {
  code: string;
  label: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // Array mit Sprachen
  languages: Language[] = [
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' }
  ];
  
  // Aktuelle Sprache
  currentLanguage: string = 'en';
  
  // Methode zum Wechseln der Sprache
  toggleLanguage(code: string): void {
    if (this.currentLanguage !== code) {
      this.currentLanguage = code;
    }
  }
  
  // Toggle-Methode für den Switch
  switchLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'de' : 'en';
  }
}
