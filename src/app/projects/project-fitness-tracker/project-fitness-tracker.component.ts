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

  ngOnInit() {
    this.project = this.projectService.getProjectByCompId('fitness-tracker');
  }

  navigateToNextProject() {
    const nextProject = this.projectService.getNextProject('fitness-tracker');
    if (nextProject) {
      const route = this.projectService.getProjectRoute(nextProject.compId);
      this.router.navigate([route]);
    }
  }

  navigateToPreviousProject() {
    // Navigation zu vorherigem Projekt - kann später implementiert werden
    this.router.navigate(['/']);
  }

  navigateBack() {
    this.router.navigate(['/']);
  }
}
