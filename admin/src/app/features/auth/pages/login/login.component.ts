import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-box">
        <div class="text-center mb-4">
          <h1 class="h3 fw-bold text-primary">Limarpoo Admin</h1>
          <p class="text-muted">E-commerce Management System</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="needs-validation">
          <div class="mb-3">
            <label for="email" class="form-label">Email Address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              formControlName="email"
              placeholder="admin@example.com"
              [class.is-invalid]="isFieldInvalid('email')"
              [disabled]="loading"
            />
            <div class="invalid-feedback" *ngIf="isFieldInvalid('email')">
              Please enter a valid email address.
            </div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              formControlName="password"
              placeholder="••••••••"
              [class.is-invalid]="isFieldInvalid('password')"
              [disabled]="loading"
            />
            <div class="invalid-feedback" *ngIf="isFieldInvalid('password')">
              Please enter your password.
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100 py-2 fw-bold"
            [disabled]="loading || loginForm.invalid"
          >
            <span *ngIf="!loading">Sign In</span>
            <span *ngIf="loading">
              <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Signing in...
            </span>
          </button>
        </form>

        <div class="mt-4 p-3 bg-light rounded">
          <p class="text-muted small mb-1"><strong>Demo Credentials:</strong></p>
          <p class="text-muted small mb-0">Email: admin@example.com</p>
          <p class="text-muted small">Password: admin123</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .login-box {
        width: 100%;
        max-width: 400px;
        padding: 2rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      }

      .invalid-feedback {
        display: block;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Get return URL from route params or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.toastService.success('Login successful!');
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.loading = false;
        // Error toast is handled by the error interceptor
      },
    });
  }
}
