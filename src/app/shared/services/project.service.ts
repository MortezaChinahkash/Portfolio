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
    console.log('Looking for project with compId:', compId);
    console.log('Available projects:', this.projects);
    const project = this.projects.find(p => p.compId === compId);
    console.log('Found project:', project);
    return project;
  }

  // Projekte initialisieren
  private initProjects() {
    // Hardcoded projects for now - ideal würden diese aus einer API kommen
    this.projects = [
      {
        id: 3,
        title: 'DABubble',
        description: 'Ein Slack-ähnlicher Messaging-Dienst mit Echtzeit-Kommunikation.',
        imageUrl: '/assets/images/projects/dabubble.jpg',
        projectUrl: 'https://example.com/dabubble',
        gitHubUrl: 'https://github.com/yourusername/dabubble',
        technologies: [
          { name: 'Angular', imageUrl: '/assets/png/icons/Skill Icons/Angular.png' },
          { name: 'TypeScript', imageUrl: '/assets/png/icons/Skill Icons/TypeScript.png' },
          { name: 'SASS', imageUrl: '/assets/png/icons/Skill Icons/SASS.png' }
        ],
        isFeatured: true,
        isInProgress: false,
        compId: 'dabubble'
      },
      // Weitere Projekte hier...
    ];
  }

  // Debugging-Methode
  public debugProjects() {
    console.log('Projects in service:', this.projects);
    if (this.projects.length === 0) {
      console.error('No projects initialized in service!');
    }
    
    const dabubbleProject = this.getProjectByCompId('dabubble');
    console.log('Dabubble project from service:', dabubbleProject);
    
    return this.projects.length > 0;
  }
}