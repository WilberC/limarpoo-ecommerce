import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export class AppRoutes {}

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'catalog', pathMatch: 'full' },
      {
        path: 'catalog',
        loadChildren: () =>
          import('./features/catalog/catalog.module').then((m) => m.CatalogModule),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./features/inventory/inventory.module').then((m) => m.InventoryModule),
      },
      {
        path: 'orders',
        loadChildren: () => import('./features/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./features/reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./features/customers/customers.module').then((m) => m.CustomersModule),
      },
      {
        path: 'support',
        loadChildren: () =>
          import('./features/support/support.module').then((m) => m.SupportModule),
      },
      {
        path: 'content',
        loadChildren: () =>
          import('./features/content/content.module').then((m) => m.ContentModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./features/users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
];
