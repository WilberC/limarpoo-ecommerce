import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MockDataService, Customer } from '../../../../core/services/mock-data.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
})
export class CustomerListComponent implements OnInit {
  customers$!: Observable<Customer[]>;

  constructor(private mockService: MockDataService) {}

  ngOnInit(): void {
    this.customers$ = this.mockService.getCustomers();
  }
}
