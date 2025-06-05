import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslationService } from '../../shared/services/translation.service';
import { PortfolioItem } from '../portfolio/portfolio.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
  projectId!: number;
  project: PortfolioItem | undefined;
  
  // Same project data structure as in the portfolio component
  private projects: PortfolioItem[] = [];

  constructor(
    private route: ActivatedRoute,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.updateProjects(); // Initialize projects array
    
    // Get the project ID from the route parameter
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.projectId = +id; // Convert to number
        this.project = this.projects.find(p => p.id === this.projectId);
      }
    });

    // Update project details when language changes
    this.translationService.currentLang$.subscribe(() => {
      this.updateProjects();
      this.project = this.projects.find(p => p.id === this.projectId);
    });
  }

  updateProjects() {
    this.projects = [
      {
        title: this.translationService.t('join_title'),
        description: this.translationService.t('join_description'),
        imageUrl: 'null',
        projectUrl: 'null',
        gitHubUrl: 'null',
        technologies: [
          { name: 'Angular', imageUrl: '/assets/png/icons/Skill Icons/Angular.png' },
          { name: 'TypeScript', imageUrl: '' },
          { name: 'SASS', imageUrl: '' },
        ],
        isFeatured: true,
        isInProgress: true,
        compId: 'join-project',
        id: 1
      },
      {
        title: this.translationService.t('pollo_title'),
        description: this.translationService.t('pollo_description'),
        imageUrl: '',
        projectUrl: '',
        gitHubUrl: '',
        technologies: [
          { name: 'JavaScript', imageUrl: '' },
          { name: 'CSS', imageUrl: '' },
          { name: 'HTML', imageUrl: '' },
        ],
        isFeatured: false,
        isInProgress: true,
        compId: 'el-pollo-loco',
        id: 2
      },
      {
        title: this.translationService.t('dabubble_title'),
        description: this.translationService.t('dabubble_description'),
        imageUrl: 'null',
        projectUrl: 'null',
        gitHubUrl: 'null',
        technologies: [
          { name: 'Angular', imageUrl: '' },
          { name: 'TypeScript', imageUrl: '' },
          { name: 'SASS', imageUrl: '' },
        ],
        isFeatured: true,
        isInProgress: true,
        compId: 'dabubble',
        id: 3 
      }
    ];
  }
}
