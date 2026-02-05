import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  customers$!: Observable<Customer[]>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.customers$ = this.userService.getUsers().pipe(
      map((users) =>
        users.map((user) => ({
          ...user,
          name: `${user.firstName} ${user.lastName}`,
          phone: 'N/A', // Default as not in User model
          totalOrders: 0, // Default for now
          joinDate: new Date(), // Default for now
        })),
      ),
    );
  }
}
