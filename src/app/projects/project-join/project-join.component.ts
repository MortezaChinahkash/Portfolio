import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../shared/services/project.service';
import { TranslationService } from '../../shared/services/translation.service';
import { PortfolioItem } from '../../shared/models/portfolio-item.model';

@Component({
  selector: 'app-project-join',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-join.component.html',
  styleUrl: './../projects.component.scss',
})
export class ProjectJoinComponent implements OnInit {
  project: PortfolioItem | undefined;

  constructor(
    private projectService: ProjectService,
    public translationService: TranslationService
  ) {}

  ngOnInit() {
    this.project = this.projectService.getProjectByCompId('join');
    
    if (!this.project) {
      console.warn('Using fallback project data');
      this.project = this.createFallbackProject();
    }
  }

  private createFallbackProject(): PortfolioItem {
    return {
      id: 999,
      title: 'Join',
      description: this.translationService.t('join_description'),
      imageUrl: '/assets/png/Design material/screens/Join.png',
      projectsImageUrl: '/assets/png/Design material/screens/join-project.png',
      projectUrl: 'https://join.example.com',
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
    };
  }
}
