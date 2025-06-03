import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';

interface Comment {
  name: string;
  text: string;
  date: string;
  role: string;
  linkedIn: string;
  backgroundImage: string;
  hoverImage?: string; // Neues optionales Feld
}

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, NgStyle],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {

  hoverLineImage = 'assets/png/Design%20material/03_Stickers/02_Testimonials/Color%20option%203/Line.png';

  comments: Comment[] = [
    {
      name: 'Tobias Lange',
      role: 'Frontend Developer',
      text: 'Sascha really kept the team together with his great organization and clear communication. We wouldn\'t have got this far without his commitment.',
      date: '2023-01-01',
      linkedIn: 'https://www.linkedin.com/in/johndoe',
      backgroundImage: 'assets/png/Design%20material/03_Stickers/02_Testimonials/Color%20option%203/A.png'
    },
    {
      name: 'Michael Weber',
      role: 'Backend Developer', 
      text: 'It was a pleasure to work with Sascha. He knows how to motivate and encourage team members to deliver the best work possible, always adding value during each brainstorm. Regarding the well-being of team members, he was always present and willing to listen and help others, with a great sense of humor as well.',
      date: '2023-01-02',
      linkedIn: 'https://www.linkedin.com/in/janesmith',
      backgroundImage: 'assets/png/Design%20material/03_Stickers/02_Testimonials/Color%20option%203/b.png'
    },
    {
      name: 'Anna Schmidt',
      role: 'UX Designer',
      text: 'Sascha was an exceptional team colleague at DA. His positive attitude and willingness to take on challenges made a significant contribution to us achieving our goals.',
      date: '2023-01-03',
      linkedIn: 'https://www.linkedin.com/in/alicejohnson',
      backgroundImage: 'assets/png/Design%20material/03_Stickers/02_Testimonials/Color%20option%203/A.png'
    }
  ];
}
