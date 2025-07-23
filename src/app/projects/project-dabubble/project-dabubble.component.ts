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

  /**
   * Initializes the DABubble project component
   * @param {TranslationService} translationService - Service for handling translations
   * @param {ProjectService} projectService - Service for managing project data
   * @param {ProjectNavigationService} projectNavigation - Service for project navigation
   * @param {Router} router - Angular router for navigation
   * @constructor
   */
  constructor(
    public translationService: TranslationService,
    private projectService: ProjectService,
    private projectNavigation: ProjectNavigationService,
    private router: Router
  ) {}

  /**
   * Component initialization lifecycle hook
   * Loads the Dabubble project data from the service
   * @returns {void}
   */
  ngOnInit() {
    this.project = this.projectService.getProjectByCompId('dabubble');
  }

  /**
   * Navigates to the next project in the portfolio
   * @returns {void}
   */
  navigateToNextProject() {
    const nextProject = this.projectService.getNextProject('dabubble');
    if (nextProject) {
      const route = this.projectService.getProjectRoute(nextProject.compId);
      this.router.navigate([route]);
    }
  }
}
