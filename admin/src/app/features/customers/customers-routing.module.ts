import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './pages/customer-list/customer-list';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile';

const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: ':id', component: CustomerProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
