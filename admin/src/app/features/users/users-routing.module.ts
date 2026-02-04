import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list';
import { RoleManagementComponent } from './pages/role-management/role-management';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'roles', component: RoleManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
