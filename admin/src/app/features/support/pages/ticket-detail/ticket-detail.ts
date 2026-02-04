import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MockDataService, Ticket } from '../../../../core/services/mock-data.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.scss',
})
export class TicketDetailComponent implements OnInit {
  ticket$: Observable<Ticket | undefined> | null = null;

  constructor(
    private route: ActivatedRoute,
    private mockService: MockDataService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ticket$ = this.mockService
        .getTickets()
        .pipe(map((tickets) => tickets.find((t) => t.id === +id)));
    }
  }
}
