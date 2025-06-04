import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definiere einen Typ für die unterstützten Sprachen
type SupportedLanguage = 'en' | 'de';

// Einfaches Interface für Sprachen
interface Language {
  code: SupportedLanguage;
  label: string;
}

// Definiere die Struktur für einen Sprachsatz
interface TranslationSet {
  about_me: string;
  skills: string;
  projects: string;
  contact: string;
}

// Verwende eine Type statt Interface für Translations
type Translations = {
  [key in SupportedLanguage]: TranslationSet;
};

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
  
  // Aktuelle Sprache mit dem korrekten Typ
  currentLanguage: SupportedLanguage = 'en';
  
  // Übersetzungsobjekt mit korrekter Typisierung
  translations: Translations = {
    en: {
      about_me: 'About me',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact'
    },
    de: {
      about_me: 'Über mich',
      skills: 'Fähigkeiten',
      projects: 'Projekte',
      contact: 'Kontakt'
    }
  };
  
  // Methode zum Wechseln der Sprache
  toggleLanguage(code: SupportedLanguage): void {
    if (this.currentLanguage !== code) {
      this.currentLanguage = code;
    }
  }
  
  // Toggle-Methode für den Switch
  switchLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'de' : 'en';
  }
  
  // Methode zum Abrufen von Übersetzungen
  getText(key: keyof TranslationSet): string {
    return this.translations[this.currentLanguage][key];
  }
}
