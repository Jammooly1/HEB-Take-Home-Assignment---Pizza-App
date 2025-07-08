// Standalone Login component for user authentication
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login', // Used as <app-login></app-login> if needed
  standalone: true,      // Marks it as standalone
  imports: [CommonModule, ReactiveFormsModule], // Import necessary modules
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Reactive form group for login fields
  loginForm: FormGroup; // Declare only

  constructor(
    private fb: FormBuilder,     // To create reactive forms
    private auth: AuthService,   // To call login API
    private router: Router       // To navigate after login
  ) {
    // Initialize form fields with validators
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/.*\S.*/), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.pattern(/.*\S.*/), Validators.maxLength(32)]],
    });
  }

  // Called when user submits the login form 
  onSubmit(): void {
    if (this.loginForm.invalid) return; // Skip if form is invalid

    // Extract username and password
    const credentials = this.loginForm.value;

    // Call the AuthService to login
    this.auth.login(credentials).subscribe({
      next: (res) => {
        // Navigate to /order after successful login
        this.router.navigate(['/order']); // Navigate to order screen
      },
      error: () => alert('Login failed') // Display error
    });
  }
}
