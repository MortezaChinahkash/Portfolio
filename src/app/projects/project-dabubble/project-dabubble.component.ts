import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../shared/services/translation.service';
import { ProjectService } from '../../shared/services/project.service';
import { PortfolioItem } from '../../shared/models/portfolio-item.model';

@Component({
  selector: 'app-project-dabubble',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-dabubble.component.html',
  styleUrl: './project-dabubble.component.scss',
})
export class ProjectDabubbleComponent implements OnInit {
  project: PortfolioItem | undefined;

  constructor(
    public translationService: TranslationService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.project = this.projectService.getProjectByCompId('dabubble');
  }
}
