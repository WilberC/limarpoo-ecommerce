import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MockDataService, Product } from '../../../../core/services/mock-data.service';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stock-list.html',
  styleUrl: './stock-list.scss',
})
export class StockListComponent implements OnInit {
  products$!: Observable<Product[]>;

  constructor(private mockService: MockDataService) {}

  ngOnInit(): void {
    this.products$ = this.mockService.getProducts();
  }
}
