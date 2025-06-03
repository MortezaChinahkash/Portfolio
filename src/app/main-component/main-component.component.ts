import { Component } from '@angular/core';
import { ATFComponent } from './atf/atf.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { CommentsComponent } from './comments/comments.component';

@Component({
  selector: 'app-main-component',
  imports: [ ATFComponent, AboutMeComponent, SkillsComponent, PortfolioComponent, ContactComponent, CommentsComponent],
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.scss'
})
export class MainComponentComponent {

}
