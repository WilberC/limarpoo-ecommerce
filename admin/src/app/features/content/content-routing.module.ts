import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentDashboardComponent } from './pages/content-dashboard/content-dashboard';
import { ContentEditorComponent } from './pages/content-editor/content-editor';

const routes: Routes = [
  { path: '', component: ContentDashboardComponent },
  { path: 'new', component: ContentEditorComponent },
  { path: ':id', component: ContentEditorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
