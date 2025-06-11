import { Injectable } from '@angular/core';
import { TranslationService } from './translation.service';
import { PortfolioItem } from '../models/portfolio-item.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: PortfolioItem[] = [];

  constructor(private translationService: TranslationService) {
    // Projekte initialisieren
    this.initProjects();
    
    // Aktualisiere Projekte, wenn sich die Sprache ändert
    if (this.translationService && this.translationService.currentLang$) {
      this.translationService.currentLang$.subscribe(() => {
        this.initProjects();
      });
    }
  }

  // Methode zum Abrufen aller Projekte
  getAllProjects(): PortfolioItem[] {
    return this.projects;
  }

  // Methode zum Abrufen eines Projekts nach ID
  getProjectById(id: number): PortfolioItem | undefined {
    return this.projects.find(project => project.id === id);
  }

  // Methode zum Abrufen eines Projekts nach compId
  getProjectByCompId(compId: string): PortfolioItem | undefined {
    
    // Das Problem könnte beim Vergleich liegen - stellen wir sicher, dass wir korrekt vergleichen
    const project = this.projects.find(p => p.compId.toLowerCase() === compId.toLowerCase());
    
    return project;
  }

  // Projekte initialisieren
  private initProjects(): void {
    this.projects = [
      {
        id: 1,
        compId: 'dabubble',
        title: this.translationService.t('dabubble_title'),
        description: this.translationService.t('dabubble_description'),
        imageUrl: '/assets/png/Design material/screens/DA_Bubble.png',
        projectsImageUrl: '/assets/png/Design material/screens/dabubble.png',
        projectUrl: 'https://example.com/dabubble',
        gitHubUrl: 'https://github.com/yourusername/dabubble',
        technologies: [
          { name: 'Angular', imageUrl: '/assets/png/icons/Skill Icons/Angular.png' },
          { name: 'TypeScript', imageUrl: '/assets/png/icons/Skill Icons/TypeScript.png' },
          { name: 'SASS', imageUrl: '/assets/png/icons/Skill Icons/SASS.png' },
          { name: 'Firebase', imageUrl: '/assets/png/icons/Skill Icons/Firebase.png' }
        ],
        isFeatured: true,
        isInProgress: false
      },
      {
        id: 2,
        compId: 'join',
        title: this.translationService.t('join_title'),
        description: this.translationService.t('join_description'),
        imageUrl: '/assets/png/Design material/screens/Join.png',
        projectsImageUrl: '/assets/png/Design material/screens/join-project.png',
        projectUrl: 'https://example.com/join-live',
        gitHubUrl: 'https://github.com/yourusername/join',
        technologies: [
          { name: 'CSS', imageUrl: '/assets/png/icons/Skill Icons/CSS.png' },
          { name: 'HTML', imageUrl: '/assets/png/icons/Skill Icons/HTML.png' },
          { name: 'Firebase', imageUrl: '/assets/png/icons/Skill Icons/Firebase.png' },
          { name: 'Angular', imageUrl: '/assets/png/icons/Skill Icons/Angular.png' },
          { name: 'TypeScript', imageUrl: '/assets/png/icons/Skill Icons/TypeScript.png' }
        ],
        isFeatured: true,
        isInProgress: false
      },
      {
        id: 3,
        compId: 'el-pollo-loco',
        title: this.translationService.t('pollo_title'),
        description: this.translationService.t('pollo_description'),
        imageUrl: '/assets/png/Design material/screens/El_Pollo.png',
        projectsImageUrl: '/assets/png/Design material/screens/el-pollo-loco.png',
        projectUrl: 'https://example.com/el-pollo-loco',
        gitHubUrl: 'https://github.com/yourusername/el-pollo-loco',
        technologies: [
          { name: 'CSS', imageUrl: '/assets/png/icons/Skill Icons/CSS.png' },
          { name: 'HTML', imageUrl: '/assets/png/icons/Skill Icons/HTML.png' },
          { name: 'JavaScript', imageUrl: '/assets/png/icons/Skill Icons/JavaScript.png' }
        ],
        isFeatured: true,
        isInProgress: false
      }
    ];
    
    // Debug-Ausgabe nach der Initialisierung
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