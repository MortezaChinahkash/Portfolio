import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectNavigationService {
  private projects = [
    'dabubble',
    'join', 
    'pokedex'
  ];

  getNextProject(currentProject: string): string {
    const currentIndex = this.projects.indexOf(currentProject);
    const nextIndex = (currentIndex + 1) % this.projects.length;
    return this.projects[nextIndex];
  }
}