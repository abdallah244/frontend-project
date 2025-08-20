import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../services/product';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error: string | null = null;
  showSuccessModal = false;
  
  
  showOptions = true;
  availableColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
  availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  selectedColor: string = '';
  selectedSize: string = '';
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
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
        this.error = 'Failed to load product details';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  
  selectColor(color: string): void {
    this.selectedColor = color;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product) {
      if (!this.selectedColor || !this.selectedSize) {
        alert('Please select color and size before adding to cart');
        return;
      }

      this.cartService.addToCart(
        this.product, 
        this.quantity, 
        this.selectedColor, 
        this.selectedSize
      );
      
      this.showSuccessModal = true;
    }
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

  goToCart(): void {
    this.closeSuccessModal();
    this.router.navigate(['/cart']);
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}