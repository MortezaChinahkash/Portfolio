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
  const char = span.textContent || '';
  span.textContent = char === char.toUpperCase()
    ? char.toLowerCase()
    : char.toUpperCase();
}

resetCase(event: MouseEvent): void {
  const span = event.target as HTMLSpanElement;
  const char = span.textContent || '';
  span.textContent = char === char.toUpperCase()
    ? char.toLowerCase()
    : char.toUpperCase();
}
  
}
