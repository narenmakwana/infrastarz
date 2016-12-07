import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {pagesRouting} from './pages.routing';
import {SharedModule} from '../shared/shared.module';
import {MaterializeModule} from 'angular2-materialize';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports : [
    pagesRouting,
    SharedModule,
    CommonModule,
    FormsModule,
    MaterializeModule
  ],
  declarations : [HomeComponent]
})
export class PagesModule {
}
