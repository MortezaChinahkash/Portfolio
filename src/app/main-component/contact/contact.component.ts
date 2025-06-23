import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from '../../shared/services/translation.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { EmailService, ContactFormData } from '../../shared/services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(
    public translationService: TranslationService,
    private formBuilder: FormBuilder,
    private emailService: EmailService
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
      return this.getRequiredFieldError(fieldName);
    }

    if (field.errors['email']) {
      return this.translationService.t('email_invalid');
    }

    if (field.errors['minlength']) {
      return this.getMinLengthError(fieldName, field.errors['minlength'].requiredLength);
    }

    return '';
  }

  private getRequiredFieldError(fieldName: string): string {
    switch (fieldName) {
      case 'name': return this.translationService.t('name_required');
      case 'email': return this.translationService.t('email_required');
      case 'message': return this.translationService.t('message_required');
      case 'privacyPolicy': return this.translationService.t('privacy_required');
      default: return this.translationService.t('field_required');
    }
  }

  private getMinLengthError(fieldName: string, minLength: number): string {
    switch (fieldName) {
      case 'name': return this.translationService.t('name_min_length');
      case 'message': return this.translationService.t('message_min_length');
      default: return `Mindestens ${minLength} Zeichen erforderlich`;
    }
  }
  // Form absenden
  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.handleFormSubmission();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  private handleFormSubmission(): void {
    this.prepareSubmission();
    const formData = this.extractFormData();
    
    this.emailService.sendEmail(formData).subscribe({
      next: (response) => this.handleSubmissionSuccess(response),
      error: (error) => this.handleSubmissionError(error)
    });
  }

  private prepareSubmission(): void {
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;
  }

  private extractFormData(): ContactFormData {
    return {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message
    };
  }

  private handleSubmissionSuccess(response: any): void {
    console.log('E-Mail erfolgreich gesendet', response);
    this.submitSuccess = true;
    this.resetForm();
    this.hideMessageAfterDelay(() => this.submitSuccess = false);
  }

  private handleSubmissionError(error: any): void {
    console.error('Fehler beim Senden der E-Mail', error);
    this.submitError = true;
    this.isSubmitting = false;
    this.hideMessageAfterDelay(() => this.submitError = false);
  }

  private resetForm(): void {
    this.contactForm.reset();
    this.contactForm.patchValue({ privacyPolicy: false });
    this.isSubmitting = false;
  }

  private hideMessageAfterDelay(callback: () => void): void {
    setTimeout(callback, 5000);
  }
}
