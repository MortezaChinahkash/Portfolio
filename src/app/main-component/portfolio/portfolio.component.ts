import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../shared/services/project.service';
import { PortfolioItem } from '../../shared/models/portfolio-item.model';
import { TranslationService, TranslationSet } from '../../shared/services/translation.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit {
  projects: PortfolioItem[] = [];
  isTranslationReady = false;
  
  constructor(
    private projectService: ProjectService,
    public translationService: TranslationService
  ) {}
  
  ngOnInit() {
    // Ensure translation service is ready
    if (this.translationService) {
      this.isTranslationReady = true;
    } else {
      console.error('Translation service is not available');
    }
    
    // Hole alle Projekte aus dem Service
    this.projects = this.projectService.getAllProjects();
  }
  
  // Safe translation helper method with proper type casting
  translate(key: string): string {
    if (this.isTranslationReady && this.translationService && this.translationService.t) {
      return this.translationService.t(key as keyof TranslationSet);
    }
    return key; // Return the key itself as fallback
  }
}
