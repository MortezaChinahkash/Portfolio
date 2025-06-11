import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../shared/services/translation.service';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  constructor(public translationService: TranslationService) {}
}
