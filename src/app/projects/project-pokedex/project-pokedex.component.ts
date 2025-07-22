import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslationService } from '../../shared/services/translation.service';
import { ProjectService } from '../../shared/services/project.service';
import { ProjectNavigationService } from '../../shared/services/project-navigation.service';
import { PortfolioItem } from '../../shared/models/portfolio-item.model';

@Component({
  selector: 'app-project-pokedex',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-pokedex.component.html',
  styleUrl: './../projects.component.scss',
})
export class ProjectPokedexComponent implements OnInit {
  project: PortfolioItem | undefined;

  constructor(
    public translationService: TranslationService,
    private projectService: ProjectService,
    private projectNavigation: ProjectNavigationService,
    private router: Router
  ) {}

  /**
   * Component initialization lifecycle hook
   * Loads the Pokedex project data from the service
   * @returns {void}
   */
  ngOnInit() {
    this.project = this.projectService.getProjectByCompId('pokedex');
  }

  /**
   * Navigates to the next project in the portfolio
   * @returns {void}
   */
  navigateToNextProject() {
    const nextProject = this.projectService.getNextProject('pokedex');
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
    // Navigation zu vorherigem Projekt - kann später implementiert werden
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
