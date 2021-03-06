import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import 'materialize-css/dist/js/materialize.js';
import 'angular2-materialize';
import {MaterializeModule} from 'angular2-materialize';
import {routing} from './app.routing';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {PagesModule} from './pages/pages.module';
import {NavigationModule} from './navigation/navigation.module';
import {GithubService} from './shared/services/github.service';
import {BaseService} from './shared/services/base.service';
import {MaterialModule} from '@angular/material';
import {AgmCoreModule} from 'angular2-google-maps/core';

@NgModule({
  declarations : [
    AppComponent
  ],
  imports : [
    SharedModule.forRoot(),
    NavigationModule.forRoot(),
    PagesModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey : 'YOUR_API_KEY_HERE' // Enter your key here!
    }),
    MaterialModule.forRoot(),
    MaterializeModule
  ],
  providers : [BaseService, GithubService],
  entryComponents : [AppComponent],
  bootstrap : [AppComponent]
})
export class AppModule {
}
