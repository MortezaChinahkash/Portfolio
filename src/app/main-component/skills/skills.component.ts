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
}
