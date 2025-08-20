import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { id: 2, name: 'John Doe', email: 'user@example.com', password: 'user123', role: 'customer' },
  ];

  private currentUser: User | null = null;
  private loggedIn = false;

  constructor(private router: Router) {
    this.checkLocalStorage();
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      this.currentUser = user;
      this.loggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    this.loggedIn = false;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUserRole(): 'admin' | 'customer' | null {
    return this.currentUser?.role || null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getUserInfo(): { name: string; email: string } | null {
    if (this.currentUser) {
      return {
        name: this.currentUser.name,
        email: this.currentUser.email
      };
    }
    return null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  isCustomer(): boolean {
    return this.currentUser?.role === 'customer';
  }

  private checkLocalStorage(): void {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.loggedIn = true;
    }
  }
}