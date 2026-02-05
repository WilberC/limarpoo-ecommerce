import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from '../../../../core/services/user.service';
import { Customer } from '../../../../core/models/customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.error = null;
    this.cdr.detectChanges();

    this.userService
      .getUsers()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (users) => {
          this.customers = users.map((user) => ({
            ...user,
            name: user.email,
            phone: 'N/A',
            totalOrders: 0,
            joinDate: new Date(),
          }));
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error loading customers:', err);
          this.error = 'Failed to load customers';
          this.cdr.detectChanges();
        },
      });
  }
}
