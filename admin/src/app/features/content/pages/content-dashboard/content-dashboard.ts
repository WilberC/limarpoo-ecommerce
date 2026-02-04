import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './content-dashboard.html',
  styleUrl: './content-dashboard.scss',
})
export class ContentDashboardComponent {
  contents = [
    {
      id: 1,
      title: 'Banner Principal Verano',
      type: 'Banner',
      status: 'Published',
      lastModified: new Date('2023-11-01'),
    },
    {
      id: 2,
      title: 'Oferta Black Friday',
      type: 'Banner',
      status: 'Draft',
      lastModified: new Date('2023-11-05'),
    },
    {
      id: 3,
      title: 'Política de Envíos',
      type: 'Page',
      status: 'Published',
      lastModified: new Date('2023-10-15'),
    },
    {
      id: 4,
      title: 'Blog: Tendencias 2024',
      type: 'Post',
      status: 'Published',
      lastModified: new Date('2023-11-02'),
    },
  ];
}
