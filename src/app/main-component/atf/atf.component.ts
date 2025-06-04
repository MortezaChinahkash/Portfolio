import { Component } from '@angular/core';
import { TranslationService } from '../../shared/services/translation.service';


@Component({
  selector: 'app-atf',
  imports: [],
  templateUrl: './atf.component.html',
  styleUrl: './atf.component.scss'
})
export class ATFComponent {

constructor(public translationService: TranslationService) {}

onLetterHover(event: MouseEvent): void {
  const span = event.target as HTMLSpanElement;

  if (span.dataset['active'] === 'true') return; 
  span.dataset['active'] = 'true';

  const char = span.textContent || '';
  span.textContent = char === char.toUpperCase()
    ? char.toLowerCase()
    : char.toUpperCase();
}

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
