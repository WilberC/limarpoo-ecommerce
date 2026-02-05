import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ProductService } from '../../../../core/services/product.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error: string | null = null;
  deleting = false;

  showDeleteModal = false;
  productToDeleteId: string | null = null;

  constructor(
    private productService: ProductService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    this.cdr.detectChanges();

    console.log('Loading products...');
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
          console.log('Products loaded:', products);
          this.products = products;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error loading products:', err);
          this.error = 'Failed to load products';
          this.cdr.detectChanges();
        },
        complete: () => {
          console.log('Products subscription completed');
        },
      });
  }

  openDeleteModal(productId: string): void {
    this.productToDeleteId = productId;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.productToDeleteId = null;
  }

  confirmDelete(): void {
    if (this.productToDeleteId) {
      this.deleting = true;
      this.cdr.detectChanges();

      this.productService
        .deleteProduct(this.productToDeleteId)
        .pipe(
          finalize(() => {
            this.deleting = false;
            this.cdr.detectChanges();
          }),
        )
        .subscribe({
          next: () => {
            this.toastService.success('Product deleted successfully');
            this.loadProducts();
            this.closeDeleteModal();
          },
          error: (err) => {
            console.error('Error deleting product:', err);
            this.closeDeleteModal();
          },
        });
    }
  }
}
