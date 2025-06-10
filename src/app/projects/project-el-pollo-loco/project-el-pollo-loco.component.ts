import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../shared/services/project.service';
import { TranslationService } from '../../shared/services/translation.service';
import { PortfolioItem } from '../../shared/models/portfolio-item.model';

@Component({
  selector: 'app-project-el-pollo-loco',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-el-pollo-loco.component.html',
  styleUrl: './../projects.component.scss',
})
export class ProjectElPolloLocoComponent implements OnInit {
  project: PortfolioItem | undefined;

  constructor(
    private projectService: ProjectService,
    public translationService: TranslationService
  ) {}

  ngOnInit() {
    // Debug ProjectService
    console.log('ProjectService check in El Pollo Loco component:');
    this.projectService.debugProjects();
    
    // Explizit nach 'el-pollo-loco' suchen (nicht 'el-pollo')
    this.project = this.projectService.getProjectByCompId('el-pollo-loco');
    
    // Debugging
    console.log('El Pollo Loco project data after retrieval:', this.project);
    
    if (!this.project) {
      console.warn('Using fallback project data for El Pollo Loco');
      this.project = this.createFallbackProject();
    }
  }

  private createFallbackProject(): PortfolioItem {
    return {
      id: 998,
      title: this.translationService.t('pollo_title'),
      description: this.translationService.t('pollo_description'),
      imageUrl: '/assets/png/Design material/screens/El_Pollo.png',
      projectsImageUrl: '/assets/png/Design material/screens/el-pollo-project.png',
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
    };
  }
}