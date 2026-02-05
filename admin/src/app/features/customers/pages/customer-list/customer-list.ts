import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UserService } from '../../../../core/services/user.service';
import { Customer } from '../../../../core/models/customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchTerm = '';
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
          this.filteredCustomers = this.customers;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error loading customers:', err);
          this.error = 'Failed to load customers';
          this.cdr.detectChanges();
        },
      });
  }

  filterCustomers(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredCustomers = this.customers;
    } else {
      this.filteredCustomers = this.customers.filter((customer) => {
        const name = (customer.name || '').toLowerCase();
        const email = (customer.email || '').toLowerCase();
        const phone = (customer.phone || '').toLowerCase();

        return name.includes(term) || email.includes(term) || phone.includes(term);
      });
    }

    this.cdr.detectChanges();
  }
}
