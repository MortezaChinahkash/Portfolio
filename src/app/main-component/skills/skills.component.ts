import { Component } from '@angular/core';

interface Skill {
  name: string;
  image: string;
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

  skills: Skill[] = [
    { 
      name: 'HTML', 
      image: 'assets/images/skills/html.png' 
    },
    { 
      name: 'CSS', 
      image: 'assets/images/skills/css.png' 
    },
    { 
      name: 'JavaScript', 
      image: 'assets/images/skills/javascript.png' 
    },
    { 
      name: 'Angular', 
      image: 'assets/images/skills/angular.png' 
    },
    { 
      name: 'React', 
      image: 'assets/images/skills/react.png' 
    },
    {
      name: 'Bootstrap',
      image: 'assets/images/skills/bootstrap.png'
    },
    {
      name: 'Material Design',
      image: 'assets/images/skills/material.png'
    },
    {
      name: 'Git',
      image: 'assets/images/skills/git.png'
    },
    {
      name: 'GitHub',
      image: 'assets/images/skills/github.png'
    },
    {
      name: 'SASS',
      image: 'assets/images/skills/sass.png'
    },
    {
      name: 'TypeScript',
      image: 'assets/images/skills/typescript.png'
    },
    {
      name: 'SCSS',
      image: 'assets/images/skills/scss.png'
    }
  ];
}
