import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;

    console.log('Loading products...');
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.ngZone.run(() => {
          console.log('Products loaded:', products);
          this.products = products;
          this.loading = false;
          this.cdr.markForCheck();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          console.error('Error loading products:', err);
          this.error = 'Failed to load products';
          this.loading = false;
          this.cdr.markForCheck();
        });
      },
      complete: () => {
        console.log('Products subscription completed');
      }
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
      this.productService.deleteProduct(this.productToDeleteId).subscribe({
        next: () => {
          this.ngZone.run(() => {
            this.toastService.success('Product deleted successfully');
            this.loadProducts();
            this.closeDeleteModal();
            this.deleting = false;
          });
        },
        error: (err) => {
          this.ngZone.run(() => {
            this.deleting = false;
            this.closeDeleteModal();
          });
        },
      });
    }
  }
}
