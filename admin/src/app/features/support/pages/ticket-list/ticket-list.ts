import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MockDataService, Ticket } from '../../../../core/services/mock-data.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.scss',
})
export class TicketListComponent implements OnInit {
  tickets$!: Observable<Ticket[]>;

  constructor(private mockService: MockDataService) {}

  ngOnInit(): void {
    this.tickets$ = this.mockService.getTickets();
  }
}
