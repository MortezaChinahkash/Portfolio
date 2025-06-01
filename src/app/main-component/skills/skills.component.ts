
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  image: string;
}

@Component({
  standalone: true,
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

  skills: Skill[] = [
    { 
      name: 'HTML', 
      image: 'assets/png/icons/Skill Icons/HTML.png' 
    },
    { 
      name: 'CSS', 
      image: 'assets/png/icons/Skill Icons/CSS.png' 
    },
    { 
      name: 'JavaScript', 
      image: 'assets/png/icons/Skill Icons/Js.png' 
    },
    { 
      name: 'Angular', 
      image: 'assets/png/icons/Skill Icons/Angular.png' 
    },
    { 
      name: 'React', 
      image: 'assets/png/icons/Skill Icons/React.png' 
    },
    {
      name: 'Bootstrap',
      image: 'assets/png/icons/Skill Icons/Bootstrap.png'
    },
    {
      name: 'Material Design',
      image: 'assets/png/icons/Skill Icons/Material Design.png'
    },
    {
      name: 'Git',
      image: 'assets/png/icons/Skill Icons/Git.png'
    },
    {
      name: 'GitHub',
      image: 'assets/png/icons/Skill Icons/GitHub.png'
    },
    {
      name: 'SASS',
      image: 'assets/png/icons/Skill Icons/SASS.png'
    },
    {
      name: 'TypeScript',
      image: 'assets/png/icons/Skill Icons/Ts.png'
    },
     {
      name: 'Vue.js',
      image: 'assets/png/icons/Skill Icons/Vue.Js.png'
    },
     {
      name: 'Firebase',
      image: 'assets/png/icons/Skill Icons/Firebase.png'
    },
     {
      name: 'Rest API',
      image: 'assets/png/icons/Skill Icons/Rest-Api.png'
    },
     {
      name: 'Scrum',
      image: 'assets/png/icons/Skill Icons/Scrum.png'
    },
    
  ];

  isDragging = false;
  startY = 0;
  currentState: 'default' | 'transition' | 'final' = 'default';

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startY = event.clientY;
    this.currentState = 'transition';
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const deltaY = event.clientY - this.startY;
      if (deltaY > 100) { 
        this.currentState = 'final';
        this.isDragging = false;
      }
    }
  }

  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
    if (this.currentState !== 'final') {
      this.currentState = 'default';
    }
  }
}

