import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  status: 'Active' | 'Inactive';
}

export interface Warehouse {
  id: number;
  name: string;
  location: string;
  capacity: number;
  manager: string;
}

export interface Order {
  id: string;
  customerName: string;
  date: Date;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Unpaid';
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  joinDate: Date;
}

export interface Ticket {
  id: number;
  subject: string;
  customer: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Closed';
  lastUpdated: Date;
}

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Camiseta de Algodón Premium',
      sku: 'TSH-001',
      price: 29.99,
      stock: 150,
      category: 'Ropa',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Pantalones Jeans Clásicos',
      sku: 'JNS-002',
      price: 49.99,
      stock: 80,
      category: 'Ropa',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Zapatillas Deportivas Running',
      sku: 'SHK-003',
      price: 89.99,
      stock: 45,
      category: 'Calzado',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Reloj Inteligente Pro',
      sku: 'WTCH-004',
      price: 199.99,
      stock: 20,
      category: 'Electrónica',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Auriculares Inalámbricos',
      sku: 'HDP-005',
      price: 59.99,
      stock: 200,
      category: 'Electrónica',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Chaqueta de Invierno',
      sku: 'JKT-006',
      price: 120.0,
      stock: 0,
      category: 'Ropa',
      status: 'Inactive',
    },
  ];

  private orders: Order[] = [
    {
      id: 'ORD-1001',
      customerName: 'Juan Pérez',
      date: new Date('2023-10-25'),
      total: 159.98,
      status: 'Delivered',
      paymentStatus: 'Paid',
    },
    {
      id: 'ORD-1002',
      customerName: 'María García',
      date: new Date('2023-10-26'),
      total: 29.99,
      status: 'Shipped',
      paymentStatus: 'Paid',
    },
    {
      id: 'ORD-1003',
      customerName: 'Carlos López',
      date: new Date('2023-10-27'),
      total: 199.99,
      status: 'Pending',
      paymentStatus: 'Unpaid',
    },
    {
      id: 'ORD-1004',
      customerName: 'Ana Martínez',
      date: new Date('2023-10-28'),
      total: 450.0,
      status: 'Cancelled',
      paymentStatus: 'Unpaid',
    },
    {
      id: 'ORD-1005',
      customerName: 'Luis Rodríguez',
      date: new Date('2023-10-29'),
      total: 89.99,
      status: 'Pending',
      paymentStatus: 'Paid',
    },
  ];

  private customers: Customer[] = [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      phone: '+34 600 123 456',
      totalOrders: 5,
      joinDate: new Date('2023-01-15'),
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria.garcia@email.com',
      phone: '+34 600 234 567',
      totalOrders: 2,
      joinDate: new Date('2023-03-22'),
    },
    {
      id: 3,
      name: 'Carlos López',
      email: 'carlos.lopez@email.com',
      phone: '+34 600 345 678',
      totalOrders: 1,
      joinDate: new Date('2023-06-10'),
    },
    {
      id: 4,
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '+34 600 456 789',
      totalOrders: 8,
      joinDate: new Date('2022-11-05'),
    },
  ];

  private tickets: Ticket[] = [
    {
      id: 101,
      subject: 'Problema con el envío',
      customer: 'Juan Pérez',
      priority: 'High',
      status: 'Open',
      lastUpdated: new Date(),
    },
    {
      id: 102,
      subject: 'Producto defectuoso',
      customer: 'María García',
      priority: 'Medium',
      status: 'In Progress',
      lastUpdated: new Date(),
    },
    {
      id: 103,
      subject: 'Consulta sobre factura',
      customer: 'Carlos López',
      priority: 'Low',
      status: 'Closed',
      lastUpdated: new Date(),
    },
  ];

  private warehouses: Warehouse[] = [
    {
      id: 1,
      name: 'Almacén Central',
      location: 'Madrid, ES',
      capacity: 50000,
      manager: 'Roberto Gómez',
    },
    {
      id: 2,
      name: 'Almacén Norte',
      location: 'Barcelona, ES',
      capacity: 25000,
      manager: 'Lucía Fernández',
    },
    {
      id: 3,
      name: 'Almacén Sur',
      location: 'Sevilla, ES',
      capacity: 15000,
      manager: 'Manuel Ruiz',
    },
  ];

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.products).pipe(delay(500));
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find((p) => p.id === id);
    return of(product).pipe(delay(500));
  }

  getOrders(): Observable<Order[]> {
    return of(this.orders).pipe(delay(500));
  }

  getCustomers(): Observable<Customer[]> {
    return of(this.customers).pipe(delay(500));
  }

  getTickets(): Observable<Ticket[]> {
    return of(this.tickets).pipe(delay(500));
  }

  getWarehouses(): Observable<Warehouse[]> {
    return of(this.warehouses).pipe(delay(500));
  }
}
