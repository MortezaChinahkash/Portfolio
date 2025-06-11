import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslationService } from '../../shared/services/translation.service';
import { ProjectService } from '../../shared/services/project.service';
import { ProjectNavigationService } from '../../shared/services/project-navigation.service';
import { PortfolioItem } from '../../shared/models/portfolio-item.model';

@Component({
  selector: 'app-project-dabubble',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-dabubble.component.html',
  styleUrl: './../projects.component.scss',
})
export class ProjectDabubbleComponent implements OnInit {
  project: PortfolioItem | undefined;

  constructor(
    public translationService: TranslationService,
    private projectService: ProjectService,
    private projectNavigation: ProjectNavigationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.project = this.projectService.getProjectByCompId('dabubble');
  }

  navigateToNextProject() {
    const nextProject = this.projectNavigation.getNextProject('dabubble');
    this.router.navigate(['/projects', nextProject]); // Entferne 's' von 'projects'
  }
}
