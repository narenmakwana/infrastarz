import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BaseService} from './services/base.service';
import {CalloutComponent} from './layout/callout/callout.component';
import {MaterializeModule} from 'angular2-materialize';
import { WidgetComponent } from './layout/widget/widget.component';
import { ChipComponent } from './layout/chip/chip.component';
import {MaterialModule} from '@angular/material';
import {ColorService} from './services/color.service';

@NgModule({
  declarations : [
    CalloutComponent, WidgetComponent, ChipComponent
  ],
  exports : [CalloutComponent, WidgetComponent, ChipComponent],
  imports : [FormsModule, CommonModule, MaterializeModule, MaterialModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule : SharedModule,
      providers : [BaseService, ColorService]
    };
  }
}
