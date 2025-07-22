/**
 * @fileoverview Project navigation service for managing project sequence navigation
 * @author Morteza Chinahkash
 * @version 1.0.0
 */

import { Injectable } from '@angular/core';

/**
 * Service responsible for handling navigation between portfolio projects
 * @class ProjectNavigationService
 * @injectable
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectNavigationService {
  /** Array of project identifiers in navigation order */
  private projects = [
    'project-dabubble',
    'project-join', 
    'project-el-pollo-loco',
    'project-pokedex',
    'project-fitness-tracker'
  ];

  /**
   * Gets the next project in the navigation sequence
   * @param {string} currentProject - The current project identifier
   * @returns {string} The next project identifier in the sequence
   */
  getNextProject(currentProject: string): string {
    const currentIndex = this.projects.indexOf(currentProject);
    const nextIndex = (currentIndex + 1) % this.projects.length;
    return this.projects[nextIndex];
  }
}