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

  /**
   * Animation patterns for skills - creates dynamic, varied animations
   * @private
   */
  private readonly animationPatterns = {
    directions: ['fade-up', 'fade-down', 'fade-left', 'fade-right'],
    zooms: ['zoom-in', 'zoom-out'],
    slides: ['slide-up', 'slide-down', 'slide-left', 'slide-right'],
    flips: ['flip-up', 'flip-down', 'flip-left', 'flip-right'],
    special: ['fade-up-right', 'fade-up-left', 'fade-down-right', 'fade-down-left']
  };

  /**
   * Returns an elegant, dynamically calculated animation for each skill
   * Creates a balanced mix of animation types with intelligent distribution
   * @param {number} index - The index of the skill in the array
   * @returns {string} AOS animation type
   */
  getSkillAnimation(index: number): string {
    const patterns = this.animationPatterns;
    const totalSkills = this.skills.length;
    
    // Create elegant distribution pattern
    if (index < 4) {
      // First 4 skills: Special diagonal animations for visual impact
      return patterns.special[index % patterns.special.length];
    } else if (index < 8) {
      // Next 4 skills: Directional fades for smooth flow
      return patterns.directions[(index - 4) % patterns.directions.length];
    } else if (index < 12) {
      // Next 4 skills: Zoom effects for variety
      const zoomIndex = (index - 8) % 2;
      return patterns.zooms[zoomIndex];
    } else {
      // Remaining skills: Flip animations for dynamic finish
      return patterns.flips[(index - 12) % patterns.flips.length];
    }
  }

  /**
   * Calculates elegant staggered delay with progressive timing
   * Creates a wave-like appearance effect
   * @param {number} index - The index of the skill in the array
   * @returns {number} Delay in milliseconds
   */
  getSkillDelay(index: number): number {
    const baseDelay = 400;
    const staggerInterval = 150;
    const waveEffect = Math.sin(index * 0.3) * 50; // Creates subtle wave pattern
    
    return baseDelay + (index * staggerInterval) + waveEffect;
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

  /**
   * Bound method reference for mouse move events during drag operations
   * @private
   */
  private boundMove = (e: MouseEvent) => this.onMouseMove(e);
  
  /**
   * Bound method reference for mouse up events to end drag operations
   * @private
   */
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
   * @param {MouseEvent} event - The mouse event
   * @returns {void}
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

  /**
   * Handles the mouse move event during a drag action
   * @param {MouseEvent} _ - The mouse event (unused)
   * @returns {void}
   */
  onMouseMove(_: MouseEvent) {
  }

  /**
   * Handles the mouseup event to end a drag action
   * @param {MouseEvent} ev - The mouse event
   * @returns {void}
   */
  onMouseUp(ev: MouseEvent) {
    if (!this.isDragging) return;

    const dy = ev.clientY - this.startY;
    this.currentState = dy > this.threshold ? 'final' : 'default';

    this.isDragging = false;
    window.removeEventListener('mousemove', this.boundMove);
    window.removeEventListener('mouseup',   this.boundUp);
  }

  /**
   * Prevents default drag behavior for the component
   * @param {DragEvent} ev - The drag event
   * @returns {void}
   */
  onDragStart(ev: DragEvent) { ev.preventDefault(); }
}
