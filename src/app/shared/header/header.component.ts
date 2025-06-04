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

  toggleLanguage() {
    this.isEnglish = !this.isEnglish;
    console.log('Sprache gewechselt zu:', this.isEnglish ? 'EN' : 'DE');
    // Hier später die Sprachumschaltung implementieren
  }
}
