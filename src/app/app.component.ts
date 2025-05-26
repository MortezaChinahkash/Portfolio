import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { ATFComponent } from './main-component/atf/atf.component';
import { AboutMeComponent } from './main-component/about-me/about-me.component';
import { SkillsComponent } from './main-component/skills/skills.component';
import { PortfolioComponent } from './main-component/portfolio/portfolio.component';
import { ContactComponent } from './main-component/contact/contact.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';
}
