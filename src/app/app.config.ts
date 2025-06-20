import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { ProjectService } from './shared/services/project.service';
import { TranslationService } from './shared/services/translation.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ProjectService,
    TranslationService,
  ]
};
