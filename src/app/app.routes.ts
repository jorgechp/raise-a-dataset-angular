import {Routes} from '@angular/router';
import {canActivateUser} from "./guard/user.guard";
import {canActivateAdmin} from "./guard/admin.guard";
import {canActivateGuest} from "./guard/guest.guard";
import {datasetCountByUserResolver} from "./resolvers/dataset-count-by-user.resolver";
import {userCountResolver} from "./resolvers/user-count.resolver";

export const routes: Routes = [
  {
    path: '',
    resolve: {
      countAllUsers: userCountResolver,
      datasetCountByUser: datasetCountByUserResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome',
      },
      {
        path: 'welcome',
        loadComponent: () =>
          import('./components/welcome/welcome.component').then(
            (c) => c.WelcomeComponent
          ),
        title: 'Welcome',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
        title: 'Dashboard',
        canActivate: [canActivateUser]
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./components/register-form/register-form.component').then(
            (c) => c.RegisterFormComponent
          ),
        canActivate: [canActivateGuest],
        title: 'Sign up'
      },
      {
        path: 'table',
        loadComponent: () =>
          import('./components/search-dataset/search-dataset.component').then(
            (c) => c.SearchDatasetComponent
          ),
        title: 'Table',
        canActivate: [canActivateUser]
      },
      {
        path: 'raise',
        loadComponent: () =>
          import('./components/raise-dataset/raise-dataset.component').then(
            (c) => c.RaiseDatasetComponent
          ),
        title: 'Raise',
        canActivate: [canActivateUser]
      },
      {
        path: 'datasets',
        loadComponent: () =>
          import('./components/search-dataset/search-dataset.component').then(
            (c) => c.SearchDatasetComponent
          ),
        title: 'Datasets',
        canActivate: [canActivateUser]
      },
      {
        path: 'dataset/:id',
        loadComponent: () =>
          import('./components/dataset-info/dataset-info.component').then(
            (c) => c.DatasetInfoComponent
          ),
        title: 'Dataset Info',
        canActivate: [canActivateUser]
      },
      {
        path: 'instance/:id',
        loadComponent: () =>
          import('./components/raise-instance/raise-instance.component').then(
            (c) => c.RaiseInstanceComponent
          ),
        title: 'Raise Instance',
        canActivate: [canActivateUser]
      },
      {
        path: 'repository/:id',
        loadComponent: () =>
          import('./components/repository-info/repository-info.component').then(
            (c) => c.RepositoryInfoComponent
          ),
        title: 'Repository Info',
        canActivate: [canActivateUser]
      },
      {
        path: 'feed',
        loadComponent: () =>
          import('./components/feed/feed.component').then(
            (c) => c.FeedComponent
          ),
        title: 'Feed dataset',
        canActivate: [canActivateUser]
      },
      {
        path: 'compliances',
        loadComponent: () =>
          import('./components/compliance/compliances.component').then(
            (c) => c.CompliancesComponent
          ),
        title: 'Compliances',
        canActivate: [canActivateUser]
      },
      {
        path: 'validate',
        loadComponent: () =>
          import('./components/validate/validate.component').then(
            (c) => c.ValidateComponent
          ),
        title: 'Validate',
        canActivate: [canActivateUser]
      },
      {
        path: 'rescue',
        loadComponent: () =>
          import('./components/rescue-table/rescue-table.component').then(
            (c) => c.RescueTableComponent
          ),
        title: 'Rescue',
        canActivate: [canActivateUser]
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./components/register-form/register-form.component').then(
            (c) => c.RegisterFormComponent
          ),
        title: 'User settings',
        canActivate: [canActivateUser]
      },
      {
        path: 'missions',
        loadComponent: () =>
          import('./components/user-missions-dialog/user-missions-dialog.component').then(
            (c) => c.UserMissionsDialogComponent
          ),
        title: 'User missions',
        canActivate: [canActivateUser]
      },
      {
        path: 'raiseActions',
        loadComponent: () =>
          import('./components/raise-actions/raise-actions.component').then(
            (c) => c.RaiseActionsComponent
          ),
        title: 'Raise actions',
        canActivate: [canActivateUser]
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./components/admin/admin.component').then(
            (c) => c.AdminComponent
          ),
        title: 'Admin',
        canActivate: [canActivateAdmin]
      },
      {
        path: 'principles',
        loadComponent: () =>
          import('./components/fair-principles/fair-principles.component').then(
            (c) => c.FairPrinciplesComponent
          ),
        title: 'FAIR principles'
      }
    ]
  }
];
