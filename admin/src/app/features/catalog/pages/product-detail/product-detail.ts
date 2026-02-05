import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetailComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId: string | null = null;
  loading = false;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastService: ToastService,
    private ngZone: NgZone,
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock_quantity: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category_id: ['', Validators.required],
      // status: ['Active', Validators.required], // Status removed as per model
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.productId = id;
      this.loadProduct(this.productId);
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.ngZone.run(() => {
          this.categories = categories;
        });
      },
      error: () => {
        this.toastService.error('Failed to load categories');
      },
    });
  }

  loadProduct(id: string): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.ngZone.run(() => {
          this.loading = false;
          if (product) {
            this.productForm.patchValue(product);
          } else {
            this.router.navigate(['/catalog']);
          }
        });
      },
      error: () => {
        this.ngZone.run(() => {
          this.loading = false;
          this.router.navigate(['/catalog']);
        });
      },
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      const productData = this.productForm.value;

      if (this.isEditMode && this.productId) {
        this.productService.updateProduct(this.productId, productData).subscribe({
          next: () => {
            this.ngZone.run(() => {
              this.loading = false;
              this.toastService.success('Product updated successfully');
              this.router.navigate(['/catalog']);
            });
          },
          error: (err) => {
            this.ngZone.run(() => {
              this.loading = false;
              // Error toast handled by error interceptor
            });
          },
        });
      } else {
        this.productService.createProduct(productData).subscribe({
          next: () => {
            this.ngZone.run(() => {
              this.loading = false;
              this.toastService.success('Product created successfully');
              this.router.navigate(['/catalog']);
            });
          },
          error: (err) => {
            this.ngZone.run(() => {
              this.loading = false;
              // Error toast handled by error interceptor
            });
          },
        });
      }
    }
  }
}
