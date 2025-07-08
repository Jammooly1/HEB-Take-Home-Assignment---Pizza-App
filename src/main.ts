// Entry point of the Angular application
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Bootstraps the standalone AppComponent with routing and other providers
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
