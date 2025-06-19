import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { TranslationService } from '../../shared/services/translation.service';

interface Comment {
  name: string;
  text: string;
  date: string;
  role: string;
  linkedIn: string;
  backgroundImage: string;
}

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, NgStyle],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit, AfterViewInit {
  hoverLineImage: string = 'assets/png/Design%20material/03_Stickers/02_Testimonials/Color%20option%203/Line.png';
  comments: Comment[] = [];

  constructor(
    public translationService: TranslationService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.updateComments();
    
    this.translationService.currentLang$.subscribe(() => {
      this.updateComments();
    });
  }
  
  ngAfterViewInit() {
    const cards = this.el.nativeElement.querySelectorAll('.comment-card');
    cards.forEach((card: HTMLElement) => {
      // Für Touch & Mouse
      card.addEventListener('pointerdown', () => {
        cards.forEach((c: HTMLElement) => c.classList.remove('touch-hover'));
        card.classList.add('touch-hover');
      });
      // Entferne das Hover bei Pointer Up außerhalb der Card
      card.addEventListener('pointerleave', () => {
        card.classList.remove('touch-hover');
      });
      // Optional: Entferne das Hover auch beim Scrollen
      card.addEventListener('pointercancel', () => {
        card.classList.remove('touch-hover');
      });
    });
  }

  updateComments() {
    // Kommentare mit übersetzten Texten erstellen, Rest bleibt unverändert
    this.comments = [
      {
        name: 'Tobias Lange',
        role: this.translationService.t('role_frontend'),
        text: this.translationService.t('comment1_text'),
        date: '2023-01-01',
        linkedIn: 'https://www.linkedin.com/in/johndoe',
        backgroundImage: 'assets/png/Design%20material/03_Stickers/02_Testimonials/Color%20option%203/A.png'
      },
      {
        name: 'Michael Weber',
        role: this.translationService.t('role_backend'),
        text: this.translationService.t('comment2_text'),
        date: '2023-01-02',
        linkedIn: 'https://www.linkedin.com/in/janesmith',
        backgroundImage: 'assets/png/Design%20material/03_Stickers/02_Testimonials/Color%20option%203/b.png'
      },
      {
        name: 'Anna Schmidt',
        role: this.translationService.t('role_ux'),
        text: this.translationService.t('comment3_text'),
        date: '2023-01-03',
        linkedIn: 'https://www.linkedin.com/in/alicejohnson',
        backgroundImage: 'assets/png/Design%20material/03_Stickers/02_Testimonials/Color%20option%203/A.png'
      }
    ];
  }
}
