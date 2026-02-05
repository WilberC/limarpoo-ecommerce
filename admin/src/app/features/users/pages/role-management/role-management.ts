import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { ToastService } from '../../../../core/services/toast.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './role-management.html',
  styleUrl: './role-management.scss',
})
export class RoleManagementComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;
  updatingUserId: string | null = null;

  availableRoles = ['ADMIN', 'STAFF', 'CUSTOMER'];

  constructor(
    private userService: UserService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loading = false;
      },
    });
  }

  updateRole(userId: string, newRole: string): void {
    if (!newRole) return;

    this.updatingUserId = userId;
    this.userService
      .updateUser(userId, { role: newRole as 'ADMIN' | 'CUSTOMER' | 'STAFF' })
      .subscribe({
        next: (user) => {
          const index = this.users.findIndex((u) => u.id === userId);
          if (index !== -1) {
            this.users[index] = user;
          }
          this.toastService.success(`Role updated to ${newRole}`);
          this.updatingUserId = null;
        },
        error: (err) => {
          this.updatingUserId = null;
          // Error handled by interceptor
        },
      });
  }

  getRoleDescription(role: string): string {
    const descriptions: { [key: string]: string } = {
      ADMIN: 'Acceso total al sistema',
      STAFF: 'Gestión de tienda y operaciones',
      CUSTOMER: 'Cliente regular',
    };
    return descriptions[role] || role;
  }

  getRoleBadgeClass(role: string): string {
    const classes: { [key: string]: string } = {
      ADMIN: 'bg-danger',
      STAFF: 'bg-warning text-dark',
      CUSTOMER: 'bg-info',
    };
    return classes[role] || 'bg-secondary';
  }
}
