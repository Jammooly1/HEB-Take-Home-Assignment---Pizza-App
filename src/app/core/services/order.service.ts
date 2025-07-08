// Service to manage pizza orders via API
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';
import { environment } from '../../../environments/environment'; // Import environment

const API_BASE = environment.apiBaseUrl; 

@Injectable({ providedIn: 'root' }) // Automatically available app-wide
export class OrderService {
  constructor(private http: HttpClient) {}

  // Submit a new order to /orders API
  placeOrder(order: Order): Observable<Order> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const apiOrder = {
      Flavor: order.Flavor,
      Crust: order.Crust,
      Size: order.Size,
      Table_No: order.Table_No
    };

    return this.http.post<Order>(`${API_BASE}/orders`, apiOrder, { headers });
  }

  // Get all existing orders from API
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_BASE}/orders`);
  }

  // Delete a specific order by ID
  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${API_BASE}/orders/${orderId}`);
  }
}
