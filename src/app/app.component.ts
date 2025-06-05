import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { TranslationService } from './shared/services/translation.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Portfolio';
  
  constructor(private translationService: TranslationService, private router: Router) {}
  
  ngOnInit(): void {
    // Initialisiere Sprache beim App-Start
    this.translationService.initLanguage();

    // Überprüfe beim Start
    this.checkIfProjectPage(this.router.url);

    // Reagiere auf Routenwechsel
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkIfProjectPage(event.url);
    });
  }

  private checkIfProjectPage(url: string) {
    const isProjectPage = url.includes('/projects/');
    
    // Body-Klasse setzen oder entfernen
    if (isProjectPage) {
      document.body.classList.add('project-page');
    } else {
      document.body.classList.remove('project-page');
    }
  }
}
