import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderComponent } from './order.component';
import { OrderService } from '../../core/services/order.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Order } from '../../models/order.model';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;

  // Mock order object used for all API responses
  const mockOrder: Order = {
    Order_ID: 1,
    Flavor: 'Cheese',
    Crust: 'Thin',
    Size: 'M',
    Table_No: 5,
    Timestamp: '2024-01-01T12:00:00Z'
  };

  beforeEach(async () => {
    // Create spy object for OrderService with mocked methods
    orderServiceSpy = jasmine.createSpyObj('OrderService', [
      'getOrders',
      'placeOrder',
      'deleteOrder'
    ]);

    // Provide mock return values matching the service typings
    orderServiceSpy.getOrders.and.returnValue(of([mockOrder]));   // Simulate fetching orders
    orderServiceSpy.placeOrder.and.returnValue(of(mockOrder));    // Simulate successful POST
    orderServiceSpy.deleteOrder.and.returnValue(of({}));   // Simulate successful DELETE

    await TestBed.configureTestingModule({
      imports: [
        OrderComponent,        // Import standalone component
        ReactiveFormsModule    // Required for Reactive Forms API
      ],
      providers: [
        { provide: OrderService, useValue: orderServiceSpy } // Inject spy instead of real service
      ]
    }).compileComponents();

    // Create the component instance and trigger Angular lifecycle
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers ngOnInit and fetchOrders
  });

  // Test: Should create the component
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test: Should fetch orders on initialization
  it('should fetch orders on init', () => {
    component.ngOnInit(); // Manually trigger ngOnInit
    expect(orderServiceSpy.getOrders).toHaveBeenCalled();
    expect(component.orders).toEqual([mockOrder]);
  });

  // Test: Should place a new order and refresh orders
  it('should place a new order and refresh orders', () => {
    const formOrder: Partial<Order> = {
      Crust: 'Thick',
      Flavor: 'Veg',
      Size: 'L',
      Table_No: 2
    };

    component.orderForm.setValue(formOrder);
    expect(component.orderForm.valid).toBeTrue(); // Ensure form is valid before submission

    spyOn(window, 'alert'); // Spy on alert to verify it's called

    component.submitOrder();

    // Use jasmine.objectContaining for partial match
    expect(orderServiceSpy.placeOrder).toHaveBeenCalledWith(
      jasmine.objectContaining(formOrder)
    );
    
    expect(orderServiceSpy.getOrders).toHaveBeenCalled(); // Should refresh orders after submit
    expect(window.alert).toHaveBeenCalledWith('Order placed successfully');
  });

  // Test: Should cancel an order and refresh orders
  it('should cancel an order and refresh orders', () => {
    spyOn(window, 'alert'); // Spy on alert

    component.cancelOrder(1); // Simulate cancel for order ID 1

    expect(orderServiceSpy.deleteOrder).toHaveBeenCalledWith(1);
    expect(orderServiceSpy.getOrders).toHaveBeenCalled(); // Should refresh orders after delete
    expect(window.alert).toHaveBeenCalledWith('Order 1 cancelled successfully');
  });

  // Test: Form should be invalid when empty
  it('should have an invalid form when empty', () => {
    expect(component.orderForm.valid).toBeFalse();
  });
});
