import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isEnglish: boolean = true; // Default auf Englisch
  currentLanguage: 'en' | 'de' = 'en'; // Default language


  toggleLanguage(language: 'en' | 'de'): void {
    // Only change if clicking on inactive language
    if (this.currentLanguage !== language) {
      this.currentLanguage = language;
      // Here you would implement your language change logic
    }
  }
}
