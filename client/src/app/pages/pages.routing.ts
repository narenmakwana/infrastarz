import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';

export const pagesRouting = RouterModule.forChild([
  {path : '', component: HomeComponent }
]);
