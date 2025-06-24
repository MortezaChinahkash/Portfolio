/**
 * @fileoverview Service for managing portfolio projects data
 * @author Morteza Chinahkash
 * @version 1.0.0
 */

import { Injectable } from '@angular/core';
import { TranslationService } from './translation.service';
import { PortfolioItem } from '../models/portfolio-item.model';

/**
 * Service responsible for managing and providing portfolio project data
 * @class ProjectService
 * @injectable
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  /** Array containing all portfolio projects */
  private projects: PortfolioItem[] = [];

  /**
   * Initializes the service and sets up language change subscriptions
   * @param {TranslationService} translationService - Service for handling translations
   * @constructor
   */
  constructor(private translationService: TranslationService) {
    // Projekte initialisieren
    this.initProjects();
    
    // Aktualisiere Projekte, wenn sich die Sprache ändert
    if (this.translationService && this.translationService.currentLang$) {
      this.translationService.currentLang$.subscribe(() => {
        this.initProjects();
      });
    }  }

  /**
   * Retrieves all portfolio projects
   * @returns {PortfolioItem[]} Array of all portfolio projects
   */
  // Methode zum Abrufen aller Projekte
  getAllProjects(): PortfolioItem[] {
    return this.projects;
  }

  /**
   * Retrieves a specific project by its numeric ID
   * @param {number} id - The unique identifier of the project
   * @returns {PortfolioItem | undefined} The project if found, undefined otherwise
   */
  // Methode zum Abrufen eines Projekts nach ID
  getProjectById(id: number): PortfolioItem | undefined {
    return this.projects.find(project => project.id === id);
  }

  /**
   * Retrieves a specific project by its component ID
   * @param {string} compId - The component identifier for routing
   * @returns {PortfolioItem | undefined} The project if found, undefined otherwise
   */
  // Methode zum Abrufen eines Projekts nach compId
  getProjectByCompId(compId: string): PortfolioItem | undefined {
    
    // Das Problem könnte beim Vergleich liegen - stellen wir sicher, dass wir korrekt vergleichen
    const project = this.projects.find(p => p.compId.toLowerCase() === compId.toLowerCase());
      return project;
  }

  /**
   * Initializes all projects with current language translations
   * @private
   * @returns {void}
   */
  // Projekte initialisieren
  private initProjects(): void {
    this.projects = [
      this.createDabubbleProject(),
      this.createJoinProject(),
      this.createElPolloLocoProject()
    ];
  }

  /**
   * Creates the DABubble project data object
   * @private
   * @returns {PortfolioItem} The DABubble project configuration
   */
  private createDabubbleProject(): PortfolioItem {
    return {
      id: 1,
      compId: 'dabubble',
      title: this.translationService.t('dabubble_title'),
      description: this.translationService.t('dabubble_description'),
      imageUrl: '/assets/png/Design material/screens/DA_Bubble.png',
      projectsImageUrl: '/assets/png/Design material/screens/dabubble.png',
      projectUrl: 'https://example.com/dabubble',
      gitHubUrl: 'https://github.com/yourusername/dabubble',
      technologies: this.getDabubbleTechnologies(),
      isFeatured: true,
      isInProgress: true
    };
  }

  private createJoinProject(): PortfolioItem {
    return {
      id: 2,
      compId: 'join',
      title: this.translationService.t('join_title'),
      description: this.translationService.t('join_description'),
      imageUrl: '/assets/png/Design material/screens/Join.png',
      projectsImageUrl: '/assets/png/Design material/screens/join-project.png',
      projectUrl: 'https://example.com/join-live',
      gitHubUrl: 'https://github.com/yourusername/join',
      technologies: this.getJoinTechnologies(),
      isFeatured: true,
      isInProgress: true
    };
  }

  private createElPolloLocoProject(): PortfolioItem {
    return {
      id: 3,
      compId: 'el-pollo-loco',
      title: this.translationService.t('pollo_title'),
      description: this.translationService.t('pollo_description'),
      imageUrl: '/assets/png/Design material/screens/El_Pollo.png',
      projectsImageUrl: '/assets/png/Design material/screens/el-pollo-loco.png',
      projectUrl: 'https://m-chinahkash.de/el-pollo-loco/',
      gitHubUrl: 'https://github.com/MortezaChinahkash/El-Pollo-Loco',
      technologies: this.getElPolloLocoTechnologies(),
      isFeatured: true,
      isInProgress: false
    };
  }

  private getDabubbleTechnologies() {
    return [
      { name: 'Angular', imageUrl: '/assets/png/icons/Skill Icons/Angular.png' },
      { name: 'TypeScript', imageUrl: '/assets/png/icons/Skill Icons/TypeScript.png' },
      { name: 'SASS', imageUrl: '/assets/png/icons/Skill Icons/SASS.png' },
      { name: 'Firebase', imageUrl: '/assets/png/icons/Skill Icons/Firebase.png' }
    ];
  }

  private getJoinTechnologies() {
    return [
      { name: 'CSS', imageUrl: '/assets/png/icons/Skill Icons/CSS.png' },
      { name: 'HTML', imageUrl: '/assets/png/icons/Skill Icons/HTML.png' },
      { name: 'Firebase', imageUrl: '/assets/png/icons/Skill Icons/Firebase.png' },
      { name: 'Angular', imageUrl: '/assets/png/icons/Skill Icons/Angular.png' },
      { name: 'TypeScript', imageUrl: '/assets/png/icons/Skill Icons/TypeScript.png' }
    ];
  }

  private getElPolloLocoTechnologies() {
    return [
      { name: 'CSS', imageUrl: '/assets/png/icons/Skill Icons/CSS.png' },
      { name: 'HTML', imageUrl: '/assets/png/icons/Skill Icons/HTML.png' },
      { name: 'JavaScript', imageUrl: '/assets/png/icons/Skill Icons/JavaScript.png' }
    ];
  }

  // Neue Methode zum Abrufen des nächsten Projekts
  getNextProject(currentCompId: string): PortfolioItem | undefined {
    const currentIndex = this.projects.findIndex(p => p.compId === currentCompId);
    if (currentIndex === -1) return undefined;
    
    const nextIndex = (currentIndex + 1) % this.projects.length;
    return this.projects[nextIndex];
  }

  // Neue Methode zum Abrufen der Route für ein Projekt
  getProjectRoute(compId: string): string {
    return `/projects/project-${compId}`;
  }

  // Debugging-Methode
  public debugProjects() {
    if (this.projects.length === 0) {
      console.error('No projects initialized in service!');
    }
    
    return this.projects.length > 0;
  }
}