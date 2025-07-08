// Defines application routes
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { OrderComponent } from './pages/order/order.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect root path to /login
  { path: 'login', component: LoginComponent },         // Login screen route
  { path: 'order', component: OrderComponent },         // Pizza ordering page route
];
