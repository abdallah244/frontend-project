import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart';
import { AuthService } from '../auth';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  shippingCost = 5.99;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartService.cartUpdated.subscribe(() => {
      this.cartItems = this.cartService.getCartItems();
    });
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    this.cartService.updateQuantity(
      item.id,
      newQuantity,
      item.color,
      item.size
    );
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id, item.color, item.size);
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  getFinalTotal(): number {
    return this.getCartTotal() + this.shippingCost;
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }
  
  goToCheckout(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}