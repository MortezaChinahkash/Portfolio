import { Component } from '@angular/core';

interface Comment {
  name: string;
  text: string;
  date: string;
  linkedIn: string;
}

@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {

  comments: Comment[] = [
    {
      name: 'John Doe',
      text: 'Great portfolio! I really liked the project on XYZ.',
      date: '2023-01-01',
      linkedIn: 'https://www.linkedin.com/in/johndoe',
    },
    {
      name: 'Jane Smith',
      text: 'Impressive work! The design of ABC is stunning.',
      date: '2023-01-02',
      linkedIn: 'https://www.linkedin.com/in/janesmith',
    },
    {
      name: 'Alice Johnson',
      text: 'Your skills in Angular are top-notch! Keep it up!',
      date: '2023-01-03',
      linkedIn: 'https://www.linkedin.com/in/alicejohnson',
    }
  ];

}
