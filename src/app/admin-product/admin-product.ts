import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService, Product } from '../services/product';
import { AuthService } from '../auth';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-product.html',
  styleUrls: ['./admin-product.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      alert('Access denied! Admin only.');
      this.router.navigate(['/login']);
      return;
    }
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/admin/products', productId]);
  }

  editProduct(productId: number): void {
    this.router.navigate(['/admin/products/edit', productId]);
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          alert('Product deleted successfully!');
          this.loadProducts(); 
        },
        error: (err) => {
          alert('Error deleting product: ' + err.message);
        }
      });
    }
  }

  addNewProduct(): void {
    this.router.navigate(['/admin/products/add']);
  }

  goToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}