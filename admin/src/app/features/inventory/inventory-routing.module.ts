import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockListComponent } from './pages/stock-list/stock-list';
import { WarehouseLocationsComponent } from './pages/warehouse-locations/warehouse-locations';

const routes: Routes = [
  { path: '', component: StockListComponent },
  { path: 'locations', component: WarehouseLocationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
