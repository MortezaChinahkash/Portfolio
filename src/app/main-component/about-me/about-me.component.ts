import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../shared/services/translation.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  constructor(public translationService: TranslationService) {}
}
