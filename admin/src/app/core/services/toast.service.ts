import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  success(message: string, duration = 3000): void {
    this.addToast({ type: 'success', message, duration });
  }

  error(message: string, duration = 5000): void {
    this.addToast({ type: 'error', message, duration });
  }

  info(message: string, duration = 3000): void {
    this.addToast({ type: 'info', message, duration });
  }

  warning(message: string, duration = 4000): void {
    this.addToast({ type: 'warning', message, duration });
  }

  remove(id: string): void {
    const toasts = this.toastsSubject.value.filter((t) => t.id !== id);
    this.toastsSubject.next(toasts);
  }

  private addToast(toast: Omit<Toast, 'id'>): void {
    const id = Date.now().toString();
    const newToast: Toast = { ...toast, id };
    const toasts = [...this.toastsSubject.value, newToast];
    this.toastsSubject.next(toasts);

    if (toast.duration) {
      setTimeout(() => {
        this.remove(id);
      }, toast.duration);
    }
  }
}
