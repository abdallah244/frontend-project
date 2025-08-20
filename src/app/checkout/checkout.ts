import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart';
import { AuthService, User } from '../auth';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  shippingCost = 5.99;
  orderSuccess = false;
  orderNumber: string = '';

  
  customerInfo = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  };

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    
    this.cartItems = this.cartService.getCartItems();
    if (this.cartItems.length === 0) {
      this.router.navigate(['/cart']);
      return;
    }

    
    const user = this.authService.getCurrentUser();
    if (user) {
      this.customerInfo.email = user.email;
      this.customerInfo.name = user.name;
    }

    
    
  }

  
  private populateUserInfo(): void {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.customerInfo.email = userInfo.email;
      this.customerInfo.name = userInfo.name;
    }
  }

  
  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  
  getFinalTotal(): number {
    return this.getCartTotal() + this.shippingCost;
  }

  
  placeOrder(): void {
    if (!this.validateForm()) {
      alert('Please fill all required fields correctly.');
      return;
    }

    
    this.processOrder();
  }

  
  private validateForm(): boolean {
    return this.customerInfo.name.trim() !== '' &&
           this.customerInfo.email.trim() !== '' &&
           this.customerInfo.address.trim() !== '' &&
           this.customerInfo.city.trim() !== '';
  }

  
  private processOrder(): void {
    

    
    
    this.orderSuccess = true;
    
    
    this.saveOrderToLocalStorage();
    
    
    setTimeout(() => {
      this.cartService.clearCart();
    }, 3000);
  }

  
  private generateOrderNumber(): string {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substr(2, 9).toUpperCase();
    return `ORD-${timestamp}-${random}`;
  }

  
  private saveOrderToLocalStorage(): void {
    const order = {
      orderNumber: this.orderNumber,
      customerInfo: this.customerInfo,
      items: this.cartItems,
      subtotal: this.getCartTotal(),
      shipping: this.shippingCost,
      total: this.getFinalTotal(),
      orderDate: new Date().toISOString()
    };

    
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    
    existingOrders.push(order);
    
    
    localStorage.setItem('orders', JSON.stringify(existingOrders));
  }

  
  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  
  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}