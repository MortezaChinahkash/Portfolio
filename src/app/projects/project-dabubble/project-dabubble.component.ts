import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../shared/services/translation.service';
import { ProjectNavigationService } from '../../shared/services/project-navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-dabubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-dabubble.component.html',
  styleUrl: './../projects.component.scss',
})
export class ProjectDabubbleComponent implements OnInit {
  project: any;

  constructor(
    public translationService: TranslationService,
    private router: Router,
    private projectNavigation: ProjectNavigationService
  ) {}

  ngOnInit(): void {
    this.loadProject();
  }

  navigateToNextProject(): void {
    const nextProject = this.projectNavigation.getNextProject('dabubble');
    this.router.navigate(['/project', nextProject]);
  }

  loadProject(): void {
    // Dein bestehender Code...
  }
}
