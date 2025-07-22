import { Component } from '@angular/core';
import { TranslationService } from '../../shared/services/translation.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-atf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atf.component.html',
  styleUrl: './atf.component.scss'
})
export class ATFComponent {
  constructor(public translationService: TranslationService) {}

  /**
   * Handles hover effect on individual letters in the hero text
   * Toggles letter case when hovered if not already active
   * @param {MouseEvent} event - The mouse hover event
   * @returns {void}
   */
  onLetterHover(event: MouseEvent): void {
    const span = event.target as HTMLSpanElement;

    if (span.dataset['active'] === 'true') return; 
    span.dataset['active'] = 'true';

    const char = span.textContent || '';
    span.textContent = char === char.toUpperCase()
      ? char.toLowerCase()
      : char.toUpperCase();
  }

  /**
   * Handles mouse leave effect on individual letters in the hero text
   * Resets letter case when mouse exits if previously active
   * @param {MouseEvent} event - The mouse leave event
   * @returns {void}
   */
  onLetterExit(event: MouseEvent): void {
    const span = event.target as HTMLSpanElement;

    if (span.dataset['active'] !== 'true') return;
    span.dataset['active'] = 'false';

    const char = span.textContent || '';
    span.textContent = char === char.toUpperCase()
      ? char.toLowerCase()
      : char.toUpperCase();
  }
}
