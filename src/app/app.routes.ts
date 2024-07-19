import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    title: 'Dashboard'
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/register-form/register-form.component').then(
        (c) => c.RegisterFormComponent
      ),
    title: 'Sign up'
  },
  {
    path: 'table',
    loadComponent: () =>
      import('./components/pick-dataset/pick-dataset.component').then(
        (c) => c.PickDatasetComponent
      ),
    title: 'Table'
  },
  {
    path: 'tree',
    loadComponent: () =>
      import('./components/tree/tree.component').then(
        (c) => c.TreeComponent
      ),
    title: 'Tree'
  },
  {
    path: 'drag-drop',
    loadComponent: () =>
      import('./components/drag-drop/drag-drop.component').then(
        (c) => c.DragDropComponent
      ),
    title: 'Drag-Drop'
  },
  {
    path: 'raise',
    loadComponent: () =>
      import('./components/raise-dataset/raise-dataset.component').then(
        (c) => c.RaiseDatasetComponent
      ),
    title: 'Raise'
  }, {
    path: 'datasets',
    loadComponent: () =>
      import('./components/pick-dataset/pick-dataset.component').then(
        (c) => c.PickDatasetComponent
      ),
    title: 'Datasets'
  },
];
