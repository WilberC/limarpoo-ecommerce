import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-management.html',
  styleUrl: './role-management.scss',
})
export class RoleManagementComponent {
  roles = [
    { name: 'Administrador', users: 2, description: 'Acceso total al sistema.' },
    { name: 'Gerente', users: 5, description: 'Gestión de tienda y reportes.' },
    { name: 'Soporte', users: 3, description: 'Acceso a tickets y clientes.' },
    { name: 'Editor', users: 1, description: 'Gestión de contenido.' },
  ];
}
