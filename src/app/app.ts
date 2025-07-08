// Root component that acts as the shell for routing
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',          // HTML tag to use this component (e.g., <app-root></app-root>)
  standalone: true,              // Marks this as a standalone component (no NgModule required)
  imports: [RouterOutlet],       // Makes RouterOutlet available in this template
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})

export class App {
  // This component serves as the root of the application
  // It contains the <router-outlet> where routed components will be displayed
  // No additional logic is needed here, just a shell for routing
}
