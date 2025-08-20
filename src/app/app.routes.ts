import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { ProductsComponent } from './products/products';
import { ProductDetailsComponent } from './product-details/product-details';
import { CartComponent } from './cart/cart';
import { CheckoutComponent } from './checkout/checkout';
import { AdminProductsComponent } from './admin-product/admin-product';
import { AdminEditProductComponent } from './admin-edit-product/admin-edit-product';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';
import { AdminProductDetailsComponent } from './admin-product-details/admin-product-details';
import { AdminGuard } from './admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  
  // Admin Routes (Protected)
  { 
    path: 'admin/dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [AdminGuard] 
  },
  { 
    path: 'admin/products', 
    component: AdminProductsComponent, 
    canActivate: [AdminGuard] 
  },
  { 
    path: 'admin/products/add', 
    component: AdminAddProductComponent, 
    canActivate: [AdminGuard] 
  },
  { 
    path: 'admin/products/:id', 
    component: AdminProductDetailsComponent, 
    canActivate: [AdminGuard] 
  },
  { 
    path: 'admin/products/edit/:id', 
    component: AdminEditProductComponent, 
    canActivate: [AdminGuard] 
  },
  
  { path: '**', redirectTo: '' }
];