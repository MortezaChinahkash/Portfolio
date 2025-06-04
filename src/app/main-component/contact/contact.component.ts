import { Component } from '@angular/core';
// Importiere den TranslationService
import { TranslationService } from '../../shared/services/translation.service';


@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  // Im Constructor injizieren
  constructor(public translationService: TranslationService) {}
}
