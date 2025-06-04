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
  isGerman = true; // Default auf Deutsch

  toggleLanguage() {
    this.isGerman = !this.isGerman;
    console.log('Sprache gewechselt zu:', this.isGerman ? 'DE' : 'EN');
    // Hier später die Sprachumschaltung implementieren
  }
}
