import { Component } from '@angular/core';
import { TranslationService } from '../../shared/services/translation.service';

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
  constructor(public translationService: TranslationService) {}

  projects: PortfolioItem[] = [
    {
      title: 'Join',
      description: 'A modern, Kanban-style task manager designed to bring remote teams together and keep projects flowing. Join lets users create workspaces, assign tasks with deadlines and subtasks, and reorganize everything via smooth drag-and-drop—no page refresh required. Real-time updates are delivered with WebSockets so every teammate sees changes the instant they happen, while role-based access control keeps sensitive boards private.',
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
      description: 'A lightweight, privacy-first discussion hub built to replace scattered WhatsApp groups and long email chains in university courses and bootcamps. DABubble combines Slack-style channels with threaded conversations, emoji reactions, and file sharing—all neatly organized around each class or cohort—so students and instructors can keep Q&A, announcements, and resources in one searchable space.',
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
