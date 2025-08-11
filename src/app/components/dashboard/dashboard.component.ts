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
  public latestProducts: Product[] = [];
  public currentUser: User | null = null;
  public isLoading: boolean = true;
  public errorMessage: string = '';

  constructor(
    private readonly productService: ProductService,
    private readonly  authService: AuthService,
    private readonly  router: Router
  ) {}

  public ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadLatestProducts();
  }

  public getImageUrl(imagePath: string | undefined): string {
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

    return finalUrl;
  }

  public getTotalValue(): number {
    return this.latestProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  }

  public getLowStockCount(): number {
    return this.latestProducts.filter(product => product.quantity < 10).length;
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private loadLatestProducts(): void {
    this.isLoading = true;
    this.productService.getLatestProducts().subscribe({
      next: (products) => {
        this.latestProducts = products;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load latest products';
        this.isLoading = false;
      }
    });
  }
}
