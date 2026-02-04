import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MockDataService, Product } from '../../../../core/services/mock-data.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;

  constructor(private mockService: MockDataService) {}

  ngOnInit(): void {
    this.products$ = this.mockService.getProducts();
  }
}
