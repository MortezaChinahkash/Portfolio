import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { TranslationService, TranslationSet } from '../../shared/services/translation.service';

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
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) return; 

    const cards = this.el.nativeElement.querySelectorAll('.comment-card');
    cards.forEach((card: HTMLElement) => {
      card.addEventListener('pointerup', (e) => {
        cards.forEach((c: HTMLElement) => c.classList.remove('touch-hover'));
        card.classList.add('touch-hover');
      });
    });

    document.addEventListener('pointerdown', (e) => {
      if (![...cards].some(card => card.contains(e.target as Node))) {
        cards.forEach((c: HTMLElement) => c.classList.remove('touch-hover'));
      }
    });
  }
  updateComments() {
    this.comments = [
      this.createCommentData('Tobias Lange', 'role_frontend', 'comment1_text', 
        'https://www.linkedin.com/in/johndoe', 'A.png'),
      this.createCommentData('Michael Weber', 'role_backend', 'comment2_text', 
        'https://www.linkedin.com/in/janesmith', 'b.png'),
      this.createCommentData('Anna Schmidt', 'role_ux', 'comment3_text', 
        'https://www.linkedin.com/in/alicejohnson', 'A.png')
    ];
  }
  private createCommentData(name: string, roleKey: string, textKey: string, 
    linkedIn: string, imageName: string): Comment {
    return {
      name: name,
      role: this.translationService.t(roleKey as any),
      text: this.translationService.t(textKey as any),
      date: '2023-01-01',
      linkedIn: linkedIn,
      backgroundImage: `assets/png/Design%20material/03_Stickers/02_Testimonials/Color%20option%203/${imageName}`
    };
  }
}
