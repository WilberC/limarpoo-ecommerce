import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-financial-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-reports.html',
  styleUrl: './financial-reports.scss',
})
export class FinancialReportsComponent {
  transactions = [
    {
      id: 'TRX-001',
      date: new Date('2023-11-01'),
      description: 'Pago Pedido #1001',
      amount: 159.98,
      type: 'Credit',
    },
    {
      id: 'TRX-002',
      date: new Date('2023-11-02'),
      description: 'Reembolso Pedido #998',
      amount: -45.5,
      type: 'Debit',
    },
    {
      id: 'TRX-003',
      date: new Date('2023-11-03'),
      description: 'Pago Pedido #1002',
      amount: 29.99,
      type: 'Credit',
    },
    {
      id: 'TRX-004',
      date: new Date('2023-11-04'),
      description: 'Pago Servicios Hosting',
      amount: -120.0,
      type: 'Debit',
    },
    {
      id: 'TRX-005',
      date: new Date('2023-11-05'),
      description: 'Pago Pedido #1005',
      amount: 89.99,
      type: 'Credit',
    },
  ];
}
