import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from './services/cart';
import { AuthService } from './auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  menuOpen = false;
  showModal = false;
  cartCount = 0;

  constructor(
    public authService: AuthService, 
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.loadFromLocalStorage();
    this.cartService.cartUpdated.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });
    this.cartCount = this.cartService.getCartCount();
  }

  handleNavClick(destination: string) {
    if (!this.authService.isLoggedIn() && destination !== 'login') {
      this.openLoginModal();
    } else {
      
      if (destination === '' && this.authService.isAdmin()) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate([`/${destination}`]);
      }
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openLoginModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onLogout() {
    this.authService.logout();
    this.cartService.clearCart();
    this.router.navigate(['/login']);
  }

  
  navigateToDashboard() {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }
}