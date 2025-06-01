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
          imageUrl: '',
        },
        {
          name: 'TypeScript',
          imageUrl: '',
        },
        {
          name: 'SCSS',
          imageUrl: '',
        },
      ],
      isFeatured: true,
      isInProgress: true,
      compId: 'join-project',
    },
    {
      title: 'El Pollo Loco – A Feather-Flinging 2-D Jump-’n’-Run',
      description: 'Description for project 2',
      imageUrl: 'https://via.placeholder.com/150',
      projectUrl: 'https://example.com/project2',
      gitHubUrl: 'https://github.com/user/project2',
      technologies: ['React', 'JavaScript'],
      isFeatured: false,
      isInProgress: true,
    },
  ];
}
