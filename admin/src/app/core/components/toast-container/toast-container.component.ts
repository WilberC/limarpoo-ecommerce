import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1050">
      <div *ngFor="let toast of toasts$ | async" class="toast show" role="alert">
        <div [ngClass]="getAlertClass(toast.type)">
          <div class="d-flex justify-content-between align-items-center">
            <strong>{{ getToastTitle(toast.type) }}</strong>
            <button
              type="button"
              class="btn-close"
              (click)="toastService.remove(toast.id)"
              aria-label="Close"
            ></button>
          </div>
          <div class="mt-2">{{ toast.message }}</div>
        </div>
      </div>
    </div>
  `,
})
export class ToastContainerComponent implements OnInit {
  toasts$!: Observable<Toast[]>;

  constructor(public toastService: ToastService) {}

  ngOnInit(): void {
    this.toasts$ = this.toastService.toasts$;
  }

  getAlertClass(type: string): string {
    switch (type) {
      case 'success':
        return 'alert alert-success alert-dismissible fade show';
      case 'error':
        return 'alert alert-danger alert-dismissible fade show';
      case 'warning':
        return 'alert alert-warning alert-dismissible fade show';
      case 'info':
      default:
        return 'alert alert-info alert-dismissible fade show';
    }
  }

  getToastTitle(type: string): string {
    switch (type) {
      case 'success':
        return '✓ Success';
      case 'error':
        return '✗ Error';
      case 'warning':
        return '⚠ Warning';
      case 'info':
      default:
        return 'ℹ Info';
    }
  }
}
