import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserListComponent {
  users = [
    {
      id: 1,
      name: 'Admin Principal',
      email: 'admin@negocio.com',
      role: 'Administrador',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Gerente Tienda',
      email: 'gerente@negocio.com',
      role: 'Gerente',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Soporte Técnico',
      email: 'soporte@negocio.com',
      role: 'Soporte',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Editor Contenido',
      email: 'editor@negocio.com',
      role: 'Editor',
      status: 'Inactive',
    },
  ];
}
