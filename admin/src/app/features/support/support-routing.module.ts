import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './pages/ticket-list/ticket-list';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail';

const routes: Routes = [
  { path: '', component: TicketListComponent },
  { path: ':id', component: TicketDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportRoutingModule {}
