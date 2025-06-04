import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../shared/services/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(public translationService: TranslationService) {}
  
  // Hilfsmethode für den Datenschutztext mit Link
  getPrivacyText(): string {
    const text = this.translationService.t('agree_privacy');
    const privacyLabel = this.translationService.t('privacy_policy');
    return text.replace('privacy policy', 
      `<a class="privacy" href="#">${privacyLabel}</a>`);
  }
}
