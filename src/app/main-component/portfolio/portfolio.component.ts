import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../shared/services/project.service';
import { PortfolioItem } from '../../shared/models/portfolio-item.model';  // Import aus dem Model

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit {
  projects: PortfolioItem[] = [];
  
  constructor(private projectService: ProjectService) {}
  
  ngOnInit() {
    // Hole alle Projekte aus dem Service
    this.projects = this.projectService.getAllProjects();
  }
}
