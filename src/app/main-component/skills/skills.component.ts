/**
 * @fileoverview Skills component displaying technical skills with interactive peel-off animation
 * @author Morteza Chinahkash
 * @version 1.0.0
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../shared/services/translation.service';

/**
 * Interface defining the structure of a skill item
 * @interface Skill
 */
interface Skill { 
  /** The name of the skill/technology */
  name: string; 
  /** Path to the skill's icon image */
  image: string; 
}

/**
 * Component displaying the skills section with animated reveal functionality
 * @class SkillsComponent
 */
@Component({
  standalone: true,
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

  /**
   * Initializes the skills component
   * @param {TranslationService} translationService - Service for handling translations
   * @constructor
   */
  constructor(public translationService: TranslationService) {}

  /**
   * Determines the CSS class for the skills ring based on current language
   * @returns {string} CSS class name for the ring animation
   */
  get ringClass(): string {
    return this.translationService.currentLang === 'de' ? 'german' : 'english';
  }

  /** Array of main technical skills */
  skills: Skill[] = [
    { name:'HTML',       image:'assets/png/icons/Skill Icons/HTML.png' },
    { name:'CSS',        image:'assets/png/icons/Skill Icons/CSS.png' },
    { name:'JavaScript', image:'assets/png/icons/Skill Icons/JavaScript.png'  },
    { name:'Angular',    image:'assets/png/icons/Skill Icons/Angular.png' },
    { name:'Vue.js',     image:'assets/png/icons/Skill Icons/Vue.Js.png' },
    { name:'Bootstrap',  image:'assets/png/icons/Skill Icons/Bootstrap.png' },
    { name:'Material',   image:'assets/png/icons/Skill Icons/Material Design.png' },
    { name:'Git',        image:'assets/png/icons/Skill Icons/Git.png' },
    { name:'GitHub',     image:'assets/png/icons/Skill Icons/GitHub.png' },
    { name:'SASS',       image:'assets/png/icons/Skill Icons/SASS.png' },
    { name:'TypeScript', image:'assets/png/icons/Skill Icons/TypeScript.png' },
    { name:'Firebase',   image:'assets/png/icons/Skill Icons/Firebase.png' },
    { name:'REST API',   image:'assets/png/icons/Skill Icons/Rest-Api.png' },
    { name:'Scrum',      image:'assets/png/icons/Skill Icons/Scrum.png' }
  ];

  /** Array of skills currently being learned */
  learningSkills: Skill[] = [
    { name:'React',      image:'assets/png/icons/Skill Icons/React.png' },
    { name:'Java',       image:'assets/png/icons/Skill Icons/java.svg' }
  ];

  private boundMove = (e: MouseEvent) => this.onMouseMove(e);
  private boundUp   = (e: MouseEvent) => this.onMouseUp(e);

  /** Indicates if the component is being dragged */
  isDragging: boolean = false;
  /**
   * Stores the initial Y-coordinate value, typically used to track the starting vertical position
   * for drag or scroll events within the component.
   */
  startY: number = 0;
  /** Threshold value in pixels for triggering drag actions */
  readonly threshold: number = 100;                         
  /** Current state of the component's animation */
  currentState: 'default' | 'transition' | 'final' = 'default';
  /** Indicates if the view is on a mobile device */
  isMobile: boolean = false;

  /**
   * Component initialization lifecycle hook
   * Sets up mobile detection and window resize listener
   * @returns {void}
   */
  ngOnInit() {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  /**
   * Checks the window size and determines if the view is on a mobile device
   * Updates the isMobile property accordingly
   * @returns {void}
   */
  checkIfMobile() {
    this.isMobile = window.innerWidth <= 1366;
  }

  /**
   * Handles click events on mobile devices
   * @param {MouseEvent} event - The mouse event
   * @returns {void}
   */
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

  /**
   * Handles the mousedown event for starting a drag action
   * @param event - The mouse event
   */
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

  /** Handles the mouse move event during a drag action */
  onMouseMove(_: MouseEvent) {
  }

  /**
   * Handles the mouseup event to end a drag action
   * @param ev - The mouse event
   */
  onMouseUp(ev: MouseEvent) {
    if (!this.isDragging) return;

    const dy = ev.clientY - this.startY;
    this.currentState = dy > this.threshold ? 'final' : 'default';

    this.isDragging = false;
    window.removeEventListener('mousemove', this.boundMove);
    window.removeEventListener('mouseup',   this.boundUp);
  }

  /** Prevents default drag behavior for the component */
  onDragStart(ev: DragEvent) { ev.preventDefault(); }
}
