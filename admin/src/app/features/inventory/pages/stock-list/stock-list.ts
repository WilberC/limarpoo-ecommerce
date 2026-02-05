import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stock-list.html',
  styleUrl: './stock-list.scss',
})
export class StockListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadStock();
  }

  loadStock(): void {
    this.loading = true;
    this.error = null;
    this.cdr.detectChanges();

    this.productService
      .getProducts()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (products) => {
          this.products = products;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error loading stock:', err);
          this.error = 'Failed to load stock';
          this.cdr.detectChanges();
        },
      });
  }

  getStockStatus(quantity: number): string {
    if (quantity === 0) return 'out-of-stock';
    if (quantity < 10) return 'low-stock';
    return 'in-stock';
  }

  getStockStatusText(quantity: number): string {
    if (quantity === 0) return 'Sin Stock';
    if (quantity < 10) return 'Stock Bajo';
    return 'En Stock';
  }
}
