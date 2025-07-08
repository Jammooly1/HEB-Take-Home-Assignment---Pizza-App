import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spy objects for AuthService and Router
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Configure TestBed with LoginComponent and its dependencies
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,        // Import standalone LoginComponent
        ReactiveFormsModule    // Import ReactiveFormsModule for form testing
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }, // Provide mocked AuthService
        { provide: Router, useValue: routerSpy }            // Provide mocked Router
      ]
    }).compileComponents();

    // Create component instance and trigger Angular lifecycle
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test: Component should be created successfully
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test: Form should be invalid when no values are provided
  it('should have invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  // Test: Should call AuthService.login and navigate on successful login
  it('should call AuthService.login and navigate on success', () => {
    // Provide valid form values
    component.loginForm.setValue({ username: 'test', password: 'test' });

    // Mock a successful login API response
    authServiceSpy.login.and.returnValue(of({ access_token: 'fake-token' }));

    // Submit the form
    component.onSubmit();

    // Expect AuthService.login to have been called with correct credentials
    expect(authServiceSpy.login).toHaveBeenCalledWith({ username: 'test', password: 'test' });

    // Expect Router.navigate to have been called with the correct path
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/order']);
  });

  // Test: Should alert on login failure
  it('should alert on login failure', () => {
    // Spy on window.alert to track calls
    spyOn(window, 'alert');

    // Provide invalid form values
    component.loginForm.setValue({ username: 'wrong', password: 'wrong' });

    // Mock a failed login API response
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Login failed')));

    // Submit the form
    component.onSubmit();

    // Expect alert to have been called with the failure message
    expect(window.alert).toHaveBeenCalledWith('Login failed');
  });
});
