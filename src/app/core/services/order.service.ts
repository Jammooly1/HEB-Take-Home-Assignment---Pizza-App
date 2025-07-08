// Service to manage pizza orders via API
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../../models/order.model';
import { environment } from '../../../environments/environment'; // Import environment

const API_BASE = environment.apiBaseUrl; 

@Injectable({ providedIn: 'root' }) // Automatically available app-wide
export class OrderService {
  constructor(private http: HttpClient, private router: Router ) {}

  // Error handler for HTTP requests
  // Handles different error statuses and navigates to login if unauthorized
  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      alert('Your session has expired. Please log in again.');
      this.router.navigate(['/login']); // Navigate back to login screen
    } else if (error.status === 409) {
      alert('No duplicate orders allowed. Please modify order.');
    } else if (error.status === 500) {
      alert('Something went wrong on the server. Please try again later.');
    } else {
      alert(`Unexpected error: ${error.message}`);
    }
    return throwError(() => error);
  }

  // Submit a new order to /orders API
  placeOrder(order: Order): Observable<Order> {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Your session has expired. Please log in again.');
      throw new Error('Unauthorized');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const apiOrder = {
      Flavor: order.Flavor,
      Crust: order.Crust,
      Size: order.Size,
      Table_No: order.Table_No
    };

    return this.http.post<Order>(`${API_BASE}/orders`, apiOrder, { headers })
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Get all existing orders from API
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_BASE}/orders`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  // Delete a specific order by ID
  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${API_BASE}/orders/${orderId}`)
      .pipe(catchError((err) => this.handleError(err)));
  }
}
