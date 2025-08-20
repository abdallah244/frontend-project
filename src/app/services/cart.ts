import { Injectable, EventEmitter } from '@angular/core';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  cartUpdated = new EventEmitter<void>();

  addToCart(item: any, quantity: number = 1, color?: string, size?: string): void {
    const existingItem = this.cartItems.find(i => 
      i.id === item.id && 
      i.color === color && 
      i.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity,
        color,
        size
      });
    }
    
    this.cartUpdated.emit();
    this.saveToLocalStorage();
  }

  removeFromCart(itemId: number, color?: string, size?: string): void {
    this.cartItems = this.cartItems.filter(item => 
      !(item.id === itemId && item.color === color && item.size === size)
    );
    this.cartUpdated.emit();
    this.saveToLocalStorage();
  }

  updateQuantity(itemId: number, quantity: number, color?: string, size?: string): void {
    const item = this.cartItems.find(i => 
      i.id === itemId && i.color === color && i.size === size
    );
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(itemId, color, size);
      } else {
        item.quantity = quantity;
        this.cartUpdated.emit();
        this.saveToLocalStorage();
      }
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getCartCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartUpdated.emit();
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  loadFromLocalStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartUpdated.emit();
    }
  }
}