import { Component } from '@angular/core';

@Component({
  selector: 'app-atf',
  imports: [],
  templateUrl: './atf.component.html',
  styleUrl: './atf.component.scss'
})
export class ATFComponent {

toggleCase(event: MouseEvent): void {
  const span = event.target as HTMLSpanElement;

  if (span.dataset['active'] === 'true') return; // already active, do nothing
  span.dataset['active'] = 'true';

  const char = span.textContent || '';
  span.textContent = char === char.toUpperCase()
    ? char.toLowerCase()
    : char.toUpperCase();
}

resetCase(event: MouseEvent): void {
  const span = event.target as HTMLSpanElement;

  if (span.dataset['active'] !== 'true') return;
  span.dataset['active'] = 'false';

  const char = span.textContent || '';
  span.textContent = char === char.toUpperCase()
    ? char.toLowerCase()
    : char.toUpperCase();
}
  
}
