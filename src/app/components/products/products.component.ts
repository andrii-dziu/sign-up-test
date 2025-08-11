import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;
  isModalOpen = false;
  isEditing = false;
  editingProductId: string | null = null;
  isLoading = true;
  errorMessage = '';
  selectedFile: File | null = null;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      sku: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load products';
        this.isLoading = false;
      }
    });
  }

  openModal(product?: Product): void {
    this.isModalOpen = true;
    this.isEditing = !!product;
    this.editingProductId = product?.id || null;
    
    if (product) {
      this.productForm.patchValue({
        name: product.name,
        sku: product.sku,
        price: product.price,
        quantity: product.quantity
      });
    } else {
      this.productForm.reset();
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isEditing = false;
    this.editingProductId = null;
    this.productForm.reset();
    this.selectedFile = null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('sku', this.productForm.get('sku')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('quantity', this.productForm.get('quantity')?.value);
      
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      if (this.isEditing && this.editingProductId) {
        this.productService.updateProduct(this.editingProductId, formData).subscribe({
          next: () => {
            this.closeModal();
            this.loadProducts();
          },
          error: (error) => {
            this.errorMessage = error.error?.message || 'Failed to update product';
          }
        });
      } else {
        this.productService.createProduct(formData).subscribe({
          next: () => {
            this.closeModal();
            this.loadProducts();
          },
          error: (error) => {
            this.errorMessage = error.error?.message || 'Failed to create product';
          }
        });
      }
    }
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete product';
        }
      });
    }
  }

  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) {
      return '';
    }
    
    // If it's an asset image (starts with /assets/)
    if (imagePath.startsWith('/assets/')) {
      return imagePath; // Keep the leading slash for Angular assets
    }
    
    // If it's an uploaded image from the server
    return `http://localhost:3001${imagePath}`;
  }

  getErrorMessage(field: string): string {
    const control = this.productForm.get(field);
    if (control?.hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    if (control?.hasError('minlength')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${control.errors?.['minlength'].requiredLength} characters`;
    }
    if (control?.hasError('min')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be greater than 0`;
    }
    return '';
  }
}
