/**
 * @fileoverview Portfolio component displaying project showcase
 * @author Morteza Chinahkash
 * @version 1.0.0
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../shared/services/project.service';
import { PortfolioItem } from '../../shared/models/portfolio-item.model';
import { TranslationService, TranslationSet } from '../../shared/services/translation.service';
import { Subscription } from 'rxjs';

/**
 * Component responsible for displaying the portfolio/projects section
 * @class PortfolioComponent
 * @implements {OnInit, OnDestroy}
 */
@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit, OnDestroy {
  /** Array of portfolio projects to display */
  projects: PortfolioItem[] = [];
  
  /** Flag indicating if translations are loaded and ready */
  isTranslationReady: boolean = false;
  
  /** Subscription to language change events */
  private translationSub: Subscription | undefined;

  /**
   * Initializes the portfolio component
   * @param {ProjectService} projectService - Service for managing project data
   * @param {TranslationService} translationService - Service for handling translations
   * @constructor
   */
  constructor(
    private projectService: ProjectService,
    public translationService: TranslationService
  ) {}

  /**
   * Component initialization lifecycle hook
   * Loads projects and sets up language change subscription
   * @returns {void}
   */
  ngOnInit(): void {
    this.loadProjects();
    this.translationSub = this.translationService.languageChanged$?.subscribe(() => {
      this.loadProjects();
    });
  }

  /**
   * Component destruction lifecycle hook
   * Unsubscribes from translation service subscription
   * @returns {void}
   */
  ngOnDestroy(): void {
    if (this.translationSub) {
      this.translationSub.unsubscribe();
    }
  }

  /**
   * Loads projects from the project service
   * Ensures the translation service is ready before loading projects
   * @private
   * @returns {void}
   */
  private loadProjects(): void {
    // Ensure translation service is ready
    if (this.translationService) {
      this.isTranslationReady = true;
    } else {
      console.error('Translation service is not available');
    }

    // Hole alle Projekte aus dem Service
    this.projects = this.projectService.getAllProjects();
  }

  /**
   * Translates a given key using the translation service
   * @param {string} key - The translation key to translate
   * @returns {string} - The translated string or the key itself if translation is not ready
   */
  // Safe translation helper method with proper type casting
  translate(key: string): string {
    if (this.isTranslationReady && this.translationService && this.translationService.t) {
      return this.translationService.t(key as keyof TranslationSet);
    }
    return key; // Return the key itself as fallback
  }
}
