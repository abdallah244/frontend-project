import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../services/product';
import { AuthService } from '../auth';

@Component({
  selector: 'app-admin-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-product-details.html',
  styleUrls: ['./admin-product-details.css']
})
export class AdminProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error: string | null = null;
  showDeleteModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('AdminProductDetailsComponent initialized');
    
    
    if (!this.authService.isAdmin()) {
      console.log('Not admin, redirecting to login');
      this.router.navigate(['/login']);
      return;
    }

    
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('Product ID from route:', productId);
    
    if (productId) {
      this.loadProduct(parseInt(productId));
    } else {
      console.error('Invalid product ID');
      this.error = 'Invalid product ID';
      this.loading = false;
    }
  }

  
  loadProduct(id: number): void {
    console.log('Loading product with ID:', id);
    this.productService.getProduct(id).subscribe({
      next: (data) => {
        console.log('Product loaded successfully:', data);
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.error = 'Failed to load product details';
        this.loading = false;
      }
    });
  }

  
  confirmDelete(): void {
    this.showDeleteModal = true;
  }

  
  cancelDelete(): void {
    this.showDeleteModal = false;
  }

  
  deleteProduct(): void {
    if (this.product) {
      this.productService.deleteProduct(this.product.id).subscribe({
        next: () => {
          console.log('Product deleted successfully');
          alert('Product deleted successfully!');
          this.showDeleteModal = false;
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Error deleting product: ' + err.message);
          this.showDeleteModal = false;
        }
      });
    }
  }

  
  editProduct(): void {
    if (this.product) {
      this.router.navigate(['/admin/products/edit', this.product.id]);
    }
  }

  
  goBack(): void {
    this.router.navigate(['/admin/products']);
  }

  
  goToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  
  getAdditionalInfo(): any {
    return {
      created: 'Jan 15, 2023',
      lastUpdated: 'Mar 22, 2023',
      status: 'Active',
      inStock: 'Yes'
    };
  }
}