import { Routes } from '@angular/router';
import { dashBoardResolver } from 'projects/weather/src/app/pages/dashboard/resolvers/dashboard-resolver';

export const routes: Routes = [
  {
    path: 'dashboard',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    resolve: { geo: dashBoardResolver },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
