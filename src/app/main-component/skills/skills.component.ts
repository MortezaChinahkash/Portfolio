import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../shared/services/translation.service';

interface Skill { name: string; image: string; }

@Component({
  standalone: true,
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

  constructor(public translationService: TranslationService) {}

  skills: Skill[] = [
    { name:'HTML',       image:'assets/png/icons/Skill Icons/HTML.png' },
    { name:'CSS',        image:'assets/png/icons/Skill Icons/CSS.png' },
    { name:'JavaScript', image:'assets/png/icons/Skill Icons/JavaScript.png'  },
    { name:'Angular',    image:'assets/png/icons/Skill Icons/Angular.png' },
    { name:'React',      image:'assets/png/icons/Skill Icons/React.png' },
    { name:'Bootstrap',  image:'assets/png/icons/Skill Icons/Bootstrap.png' },
    { name:'Material',   image:'assets/png/icons/Skill Icons/Material Design.png' },
    { name:'Git',        image:'assets/png/icons/Skill Icons/Git.png' },
    { name:'GitHub',     image:'assets/png/icons/Skill Icons/GitHub.png' },
    { name:'SASS',       image:'assets/png/icons/Skill Icons/SASS.png' },
    { name:'TypeScript', image:'assets/png/icons/Skill Icons/TypeScript.png' },
    { name:'Vue.js',     image:'assets/png/icons/Skill Icons/Vue.Js.png' },
    { name:'Firebase',   image:'assets/png/icons/Skill Icons/Firebase.png' },
    { name:'REST API',   image:'assets/png/icons/Skill Icons/Rest-Api.png' },
    { name:'Scrum',      image:'assets/png/icons/Skill Icons/Scrum.png' }
  ];

  private boundMove = (e: MouseEvent) => this.onMouseMove(e);
  private boundUp   = (e: MouseEvent) => this.onMouseUp(e);

  isDragging   = false;
  startY       = 0;
  readonly threshold = 100;                         
  currentState: 'default' | 'transition' | 'final' = 'default';
  isMobile: boolean = false;

  ngOnInit() {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  onMobileClick(event: MouseEvent) {
    if (this.isMobile) {
      event.preventDefault();
      if (this.currentState === 'default') {
        this.currentState = 'transition';
        setTimeout(() => {
          this.currentState = 'final';
        }, 500);
      } else if (this.currentState === 'final') {
        this.currentState = 'default';
      }
    }
  }

  onMouseDown(event: MouseEvent) {
    if (!this.isMobile) {
      if (this.currentState === 'final') return;      
      this.isDragging   = true;
      this.startY       = event.clientY;
      this.currentState = 'transition';

      window.addEventListener('mousemove', this.boundMove);
      window.addEventListener('mouseup',   this.boundUp);
    }
  }

  onMouseMove(_: MouseEvent) {
  }

  onMouseUp(ev: MouseEvent) {
    if (!this.isDragging) return;

    const dy = ev.clientY - this.startY;
    this.currentState = dy > this.threshold ? 'final' : 'default';

    this.isDragging = false;
    window.removeEventListener('mousemove', this.boundMove);
    window.removeEventListener('mouseup',   this.boundUp);
  }

  onDragStart(ev: DragEvent) { ev.preventDefault(); }
}
