import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from '../../shared/services/translation.service';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    public translationService: TranslationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      privacyPolicy: [false, [Validators.requiredTrue]]
    });
  }

  // Getter für einfachen Zugriff auf Form-Controls
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }
  get privacyPolicy() { return this.contactForm.get('privacyPolicy'); }

  // Überprüft ob ein Feld einen Fehler hat
  hasError(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  // Gibt die entsprechende Fehlermeldung zurück
  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      switch (fieldName) {
        case 'name': return this.translationService.t('name_required');
        case 'email': return this.translationService.t('email_required');
        case 'message': return this.translationService.t('message_required');
        case 'privacyPolicy': return this.translationService.t('privacy_required');
        default: return this.translationService.t('field_required');
      }
    }

    if (field.errors['email']) {
      return this.translationService.t('email_invalid');
    }

    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      switch (fieldName) {
        case 'name': return this.translationService.t('name_min_length');
        case 'message': return this.translationService.t('message_min_length');
        default: return `Mindestens ${minLength} Zeichen erforderlich`;
      }
    }

    return '';
  }

  // Form absenden
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // Hier würden Sie die Daten an einen Service oder Server senden
      // Beispiel: this.contactService.sendMessage(this.contactForm.value);
    } else {
      // Markiere alle Felder als touched, um Validierungsfehler anzuzeigen
      this.contactForm.markAllAsTouched();
    }
  }
}
