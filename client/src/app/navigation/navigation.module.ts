import {NgModule, ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {SidenavComponent} from './sidenav/sidenav.component';
import {TopnavComponent} from './topnav/topnav.component';
import {SharedModule} from '../shared/shared.module';
import {MaterializeModule} from 'angular2-materialize';
import {NavigationService} from './navigation.service';
import {SidenavItemComponent} from './sidenav/sidenav-item/sidenav-item.component';
import {FooterComponent} from './footer/footer.component';
import {DefaultLayoutComponent} from './layouts/default/default.layout.component';

@NgModule({
  imports : [
    MaterialModule,
    RouterModule,
    CommonModule,
    SharedModule,
    FormsModule,
    MaterializeModule
  ],
  declarations : [SidenavComponent, TopnavComponent, SidenavItemComponent, FooterComponent, DefaultLayoutComponent],
  exports : [SidenavComponent, TopnavComponent, FooterComponent, DefaultLayoutComponent]
})
export class NavigationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule : NavigationModule,
      providers : [NavigationService]
    };
  }
}

