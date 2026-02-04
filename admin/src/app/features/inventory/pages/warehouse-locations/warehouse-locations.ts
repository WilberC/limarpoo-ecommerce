import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MockDataService, Warehouse } from '../../../../core/services/mock-data.service';

@Component({
  selector: 'app-warehouse-locations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warehouse-locations.html',
  styleUrl: './warehouse-locations.scss',
})
export class WarehouseLocationsComponent implements OnInit {
  warehouses$!: Observable<Warehouse[]>;

  constructor(private mockService: MockDataService) {}

  ngOnInit(): void {
    this.warehouses$ = this.mockService.getWarehouses();
  }
}
