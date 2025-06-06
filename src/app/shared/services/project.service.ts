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
        id: 1,
        title: 'Join',
        description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
        imageUrl: '/assets/png/Design material/screens/Join.png',
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
        isInProgress: false,
        compId: 'join'
      },
      {
        id: 2,
        title: 'El Pollo Loco',
        description: 'Jump and run game based on object-oriented JavaScript. Help Pepe find coins and salsa bottles to defeat the crazy chicken.',
        imageUrl: '/assets/png/Design material/screens/El_Pollo.png',
        projectUrl: 'https://example.com/el-pollo-loco',
        gitHubUrl: 'https://github.com/yourusername/el-pollo-loco',
        technologies: [
          { name: 'CSS', imageUrl: '/assets/png/icons/Skill Icons/CSS.png' },
          { name: 'HTML', imageUrl: '/assets/png/icons/Skill Icons/HTML.png' },
          { name: 'JavaScript', imageUrl: '/assets/png/icons/Skill Icons/JavaScript.png' }
        ],
        isFeatured: true,
        isInProgress: false,
        compId: 'el-pollo-loco'
      },
      {
        id: 3,
        title: 'DABubble',
        description: 'Ein Slack-ähnlicher Messaging-Dienst mit Echtzeit-Kommunikation.',
        imageUrl: '/assets/png/Design material/screens/DA_Bubble.png',
        projectUrl: 'https://example.com/dabubble',
        gitHubUrl: 'https://github.com/yourusername/dabubble',
        technologies: [
          { name: 'Angular', imageUrl: '/assets/png/icons/Skill Icons/Angular.png' },
          { name: 'TypeScript', imageUrl: '/assets/png/icons/Skill Icons/TypeScript.png' },
          { name: 'SASS', imageUrl: '/assets/png/icons/Skill Icons/SASS.png' },
          { name: 'Firebase', imageUrl: '/assets/png/icons/Skill Icons/Firebase.png' }
        ],
        isFeatured: true,
        isInProgress: false,
        compId: 'dabubble'
      }
    ];
  }

  // Debugging-Methode
  public debugProjects() {
    console.log('Projects in service:', this.projects);
    if (this.projects.length === 0) {
      console.error('No projects initialized in service!');
    }
    
    return this.projects.length > 0;
  }
}