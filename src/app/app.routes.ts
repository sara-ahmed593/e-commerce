import { authGuard } from './core/auth/guards/auth-guard';
import { Routes, CanActivateFn } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component')
        .then(c => c.HomeComponent)
  },

   {
    path: 'search/:value',
    loadComponent: () =>
      import('./features/search/search.component')
        .then(c => c.SearchComponent)
  },

  {
    path: 'shop',
    loadComponent: () =>
      import('./features/shop/shop.component')
        .then(c => c.ShopComponent)
  },

  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories.component')
        .then(c => c.CategoriesComponent)
  },

  {
    path: 'categories/:id',
    loadComponent: () =>
      import('./features/category-details/category-details.component')
        .then(c => c.CategoryDetailsComponent),
  },
  {
    path: 'subcategories/:id/:name',
    loadComponent: () =>
      import('./features/subcategories/subcategories.component')
        .then(c => c.SubcategoriesComponent),
  },

  {
    path: 'brand',
    loadComponent: () =>
      import('./features/brand/brand.component')
        .then(c => c.BrandComponent)
  },
  {
    path: 'brand/:id',
    loadComponent: () =>
      import('./features/brands-details/brands-details.component')
        .then(c => c.BrandsDetailsComponent)
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component')
        .then(c => c.CartComponent),
        canActivate: [authGuard]
  },

  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component')
        .then(c => c.WishlistComponent),
     canActivate: [authGuard]

  },

  {
    path: 'details/:slug/:id',
    loadComponent: () =>
      import('./features/details/details.component')
        .then(c => c.DetailsComponent)
  },

  {
    path: 'checkout/:id',
    loadComponent: () =>
      import('./features/checkout/checkout.component')
        .then(c => c.CheckoutComponent),
        canActivate: [authGuard]

  },

  {
    path: 'allorders',
    loadComponent: () =>
      import('./features/orders/orders.component')
        .then(c => c.OrdersComponent),
        canActivate: [authGuard]

  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component')
        .then(c => c.LoginComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component')
        .then(c => c.RegisterComponent)
  },

  {
    path: 'forget-password',
    loadComponent: () =>
      import('./features/forget-password/forget-password.component')
        .then(c => c.ForgetPasswordComponent)
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component')
        .then(c => c.NotFoundComponent)
  }
];

