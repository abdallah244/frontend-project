import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  showAllProducts(): void {
    this.router.navigate(['/admin/products']);
  }

  addNewProduct(): void {
    this.router.navigate(['/admin/products/add']);
  }

  viewOrders(): void {
    alert('Orders management would be implemented here!');
    // يمكنك إضافة صفحة إدارة الطلبات لاحقاً
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}