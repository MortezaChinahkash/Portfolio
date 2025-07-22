import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslationService } from '../../shared/services/translation.service';
import { ProjectService } from '../../shared/services/project.service';
import { ProjectNavigationService } from '../../shared/services/project-navigation.service';
import { PortfolioItem } from '../../shared/models/portfolio-item.model';

@Component({
  selector: 'app-project-fitness-tracker',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-fitness-tracker.component.html',
  styleUrl: './../projects.component.scss',
})
export class ProjectFitnessTrackerComponent implements OnInit {
  project: PortfolioItem | undefined;

  constructor(
    public translationService: TranslationService,
    private projectService: ProjectService,
    private projectNavigation: ProjectNavigationService,
    private router: Router
  ) {}

  /**
   * Component initialization lifecycle hook
   * Loads the Fitness Tracker project data from the service
   * @returns {void}
   */
  ngOnInit() {
    this.project = this.projectService.getProjectByCompId('fitness-tracker');
  }

  /**
   * Navigates to the next project in the portfolio
   * @returns {void}
   */
  navigateToNextProject() {
    const nextProject = this.projectService.getNextProject('fitness-tracker');
    if (nextProject) {
      const route = this.projectService.getProjectRoute(nextProject.compId);
      this.router.navigate([route]);
    }
  }

  /**
   * Navigates to the previous project in the portfolio
   * Currently navigates to home page as placeholder
   * @returns {void}
   */
  navigateToPreviousProject() {
    this.router.navigate(['/']);
  }

  /**
   * Navigates back to the home page
   * @returns {void}
   */
  navigateBack() {
    this.router.navigate(['/']);
  }
}
