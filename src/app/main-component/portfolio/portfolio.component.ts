import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../shared/services/translation.service';

interface PortfolioItem {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  gitHubUrl: string;
  technologies: { name: string; imageUrl: string }[];
  isFeatured: boolean;
  isInProgress: boolean;
  compId: string;
  id: number;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit {
  projects: PortfolioItem[] = [];
  
  constructor(public translationService: TranslationService) {}
  
  ngOnInit() {
    this.updateProjects();
    
    // Aktualisiere Projekte, wenn sich die Sprache ändert
    this.translationService.currentLang$.subscribe(() => {
      this.updateProjects();
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
