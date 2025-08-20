import { Component } from '@angular/core';
import { AppComponent } from '../app';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  constructor(
    private app: AppComponent,
    private authService: AuthService,
    private router: Router 
  ) {}

  startShopping() {
    if (!this.authService.isLoggedIn()) {
      this.app.openLoginModal(); 
    } else {
      this.router.navigate(['/products']); 
    }
  }
}