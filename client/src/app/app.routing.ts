import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {HomeComponent} from './pages/home/home.component';

const appRoutes: Routes = [
  {
    path : 'pages', loadChildren : () => new Promise(resolve => {
    (require as any).ensure([], (require: any) => {
      resolve(require('./pages/pages.module').PagesModule);
    });
  })
  },
  {path : '', component: HomeComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
