import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MockDataService } from '../../../../core/services/mock-data.service';

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
  productId: number | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mockService: MockDataService,
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      status: ['Active', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.productId = +id;
      this.loadProduct(this.productId);
    }
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.mockService.getProductById(id).subscribe((product) => {
      this.loading = false;
      if (product) {
        this.productForm.patchValue(product);
      } else {
        // Handle not found
        this.router.navigate(['/catalog']);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      console.log('Saving product:', this.productForm.value);
      // Simulate save
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/catalog']);
      }, 1000);
    }
  }
}
