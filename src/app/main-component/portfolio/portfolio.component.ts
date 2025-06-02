import { Component } from '@angular/core';

interface PortfolioItem {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  gitHubUrl: string;
  technologies: { name: string; imageUrl: string }[];
  isFeatured: boolean;
  isInProgress: boolean;
  compId: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  projects: PortfolioItem[] = [
    {
      title: 'Join',
      description: 'Description coming soon',
      imageUrl: 'null',
      projectUrl: 'null',
      gitHubUrl: 'null',
      technologies: [
        {
          name: 'Angular',
          imageUrl: '/assets/png/icons/Skill Icons/Angular.png',
        },
        {
          name: 'TypeScript',
          imageUrl: '',
        },
        {
          name: 'SASS',
          imageUrl: '',
        },
      ],
      isFeatured: true,
      isInProgress: true,
      compId: 'join-project',
    },
    {
        title: 'El Pollo Loco – A Feather-Flinging 2-D Jump-’n’-Run',
        description:
          'Dive into a sun-scorched desert canyon where a fearless farmhand faces off against a riotous flock of mutant chickens. El Pollo Loco blends classic side-scrolling action with slap-stick humor and crisp, hand-drawn art to deliver a fast-paced platformer that feels both nostalgic and fresh.',
        imageUrl: '',
        projectUrl: '',
        gitHubUrl: '',
      technologies: [
        {
          name: 'JavaScript',
          imageUrl: '',
        },
        {
          name: 'CSS',
          imageUrl: '',
        },
        {
          name: 'HTML',
          imageUrl: '',
        },
      ],
      isFeatured: false,
      isInProgress: true,
      compId: 'el-pollo-loco',
    },
    {
      title: 'DABubble',
      description: 'Project description coming soon',
      imageUrl: 'null',
      projectUrl: 'null',
      gitHubUrl: 'null',
      technologies: [
        {
          name: 'Angular',
          imageUrl: '',
        },
        {
          name: 'TypeScript',
          imageUrl: '',
        },
        {
          name: 'SASS',
          imageUrl: '',
        },
      ],
      isFeatured: true,
      isInProgress: true,
      compId: 'dabubble',
    }
  ];
}
