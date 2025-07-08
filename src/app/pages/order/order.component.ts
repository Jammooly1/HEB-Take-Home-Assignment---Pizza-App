import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;        // Reactive form for placing orders
  orders: Order[] = [];        // Holds list of current orders

  // Predefined dropdown options
  crustOptions = ['Normal', 'Thin', 'Thick', 'Stuffed', 'Gluten-Free'];
  flavorOptions = ['Beef', 'Cheese', 'Chicken-Fajita', 'Pepperoni', 'Veggie', 'Hawaiian', 'BBQ Chicken'];
  sizeOptions = ['S', 'M', 'L', 'XL'];

  constructor(private fb: FormBuilder, private orderService: OrderService) {
    // Initialize the order form
    this.orderForm = this.fb.group({
      Crust: ['', Validators.required],
      Flavor: ['', Validators.required],
      Size: ['', Validators.required],
      Table_No: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchOrders(); // Load existing orders on component init
  }

  fetchOrders(): void {
    this.orderService.getOrders().subscribe(data => this.orders = data);
  }

  submitOrder(): void {
    if (this.orderForm.invalid) return;

    const order: Order = this.orderForm.value;
    this.orderService.placeOrder(order).subscribe(() => {
      alert('Order placed successfully');
      this.fetchOrders();
    });
  }

  cancelOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(() => {
      alert(`Order ${orderId} cancelled successfully`);
      this.fetchOrders();
    });
  }
}
