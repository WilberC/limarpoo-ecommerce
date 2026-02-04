import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MockDataService, Order } from '../../../../core/services/mock-data.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.scss',
})
export class OrderDetailComponent implements OnInit {
  order$: Observable<Order | undefined> | null = null;

  constructor(
    private route: ActivatedRoute,
    private mockService: MockDataService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.order$ = this.mockService
        .getOrders()
        .pipe(map((orders) => orders.find((o) => o.id === id)));
    }
  }
}
