import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../shared/services/project.service';
import { PortfolioItem } from '../../shared/models/portfolio-item.model';

@Component({
  selector: 'app-project-dabubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-dabubble.component.html',
  styleUrl: './../projects.component.scss',
})
export class ProjectDabubbleComponent implements OnInit {
  project: PortfolioItem | undefined;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    // Debug ProjectService
    console.log('ProjectService check:');
    const hasProjects = this.projectService.debugProjects();
    
    // Hole das Dabubble-Projekt
    this.project = this.projectService.getProjectByCompId('dabubble');
    
    // Debugging
    console.log('Project data after retrieval:', this.project);
    
    // Fallback, falls das Projekt nicht gefunden wurde
    if (!this.project) {
      console.warn('Using fallback project data');
      this.project = this.createFallbackProject();
    }
    
    // Final check
    console.log('Final project data:', this.project);
  }

  // Fallback-Projekt mit vollständigeren Daten erstellen
  private createFallbackProject(): PortfolioItem {
    return {
      id: 999,
      title: 'DABubble Chat Application',
      description: 'Ein Slack-ähnlicher Messaging-Dienst mit Echtzeit-Kommunikation, Direktnachrichten, Channels und Dateianhängen. Entwickelt mit Angular und Firebase für Echtzeit-Datenverarbeitung.',
      imageUrl: '/assets/img/projects/dabubble.jpg',
      projectsImageUrl: '/assets/png/Design material/screens/dabubble-project.png',
      projectUrl: 'https://dabubble.example.com',
      gitHubUrl: 'https://github.com/example/dabubble',
      technologies: [
        { name: 'Angular', imageUrl: '/assets/png/icons/Skill Icons/Angular.png' },
        { name: 'TypeScript', imageUrl: '/assets/png/icons/Skill Icons/TypeScript.png' },
        { name: 'SASS', imageUrl: '/assets/png/icons/Skill Icons/SASS.png' },
        { name: 'Firebase', imageUrl: '/assets/png/icons/Skill Icons/Firebase.png' },
      ],
      isFeatured: true,
      isInProgress: false,
      compId: 'dabubble'
    };
  }
}
