import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../services/product';

@Component({
  selector: 'app-admin-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-edit-product.html',
  styleUrls: ['./admin-edit-product.css']
})
export class AdminEditProductComponent implements OnInit {
  product: Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 }
  };
  
  loading = true;
  saving = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(parseInt(productId));
    }
  }

  loadProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load product';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  onSubmit(): void {
    this.saving = true;
    this.error = null;

    this.productService.updateProduct(this.product.id, this.product).subscribe({
      next: () => {
        this.saving = false;
        alert('Product updated successfully!');
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        this.saving = false;
        this.error = 'Failed to update product: ' + err.message;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/products']);
  }
}