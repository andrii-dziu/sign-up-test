import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class DashboardComponent implements OnInit {
  latestProducts: Product[] = [];
  currentUser: User | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadLatestProducts();
  }

  loadLatestProducts(): void {
    this.isLoading = true;
    this.productService.getLatestProducts().subscribe({
      next: (products) => {
        this.latestProducts = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load latest products';
        this.isLoading = false;
      }
    });
  }

  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) {
      return '';
    }
    
    let finalUrl = '';
    
    // If it's an asset image (starts with /assets/)
    if (imagePath.startsWith('/assets/')) {
      finalUrl = imagePath; // Keep the leading slash for Angular assets
    } else {
      // If it's an uploaded image from the server
      finalUrl = `http://localhost:3001${imagePath}`;
    }
    
    console.log('Image URL:', { original: imagePath, final: finalUrl });
    return finalUrl;
  }

  getTotalValue(): number {
    return this.latestProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  }

  getLowStockCount(): number {
    return this.latestProducts.filter(product => product.quantity < 10).length;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
