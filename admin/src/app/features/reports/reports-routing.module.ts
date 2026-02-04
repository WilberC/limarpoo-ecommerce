import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesAnalyticsComponent } from './pages/sales-analytics/sales-analytics';
import { FinancialReportsComponent } from './pages/financial-reports/financial-reports';

const routes: Routes = [
  { path: '', component: SalesAnalyticsComponent },
  { path: 'financial', component: FinancialReportsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
