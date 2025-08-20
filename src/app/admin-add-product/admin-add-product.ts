import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-add-product.html',
  styleUrls: ['./admin-add-product.css']
})
export class AdminAddProductComponent {
  product: any = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  };
  
  loading = false;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.error = null;

    this.productService.addProduct(this.product).subscribe({
      next: (newProduct) => {
        this.loading = false;
        alert('Product added successfully!');
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to add product: ' + err.message;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/products']);
  }
}