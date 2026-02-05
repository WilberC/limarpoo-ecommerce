import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Unauthorized - clear session and redirect to login
        authService.logout();
        router.navigate(['/login']);
        toastService.error('Session expired. Please login again.');
      } else if (error.status === 403) {
        toastService.error('Access denied');
      } else if (error.status >= 500) {
        toastService.error('Server error. Please try again later.');
      } else if (error.status === 0) {
        // Network error
        toastService.error('Network error. Please check your connection.');
      } else {
        // Try to get error message from backend
        const errorMessage = error.error?.error || error.error?.message || 'An error occurred';
        toastService.error(errorMessage);
      }

      return throwError(() => error);
    })
  );
};
