import {Component, ElementRef} from '@angular/core';
import {NavigationService} from './navigation/navigation.service';
import {HostListener} from '@angular/core/src/metadata/directives';
import {Router, Event, NavigationStart, NavigationEnd} from '@angular/router';
import {Angulartics2GoogleAnalytics} from 'angulartics2/src/providers/angulartics2-ga';
import {Angulartics2} from 'angulartics2';

@Component({
  selector : 'app-root',
  templateUrl : 'app.component.html',
  styleUrls : ['app.component.sass']
})
export class AppComponent {
  private showSidenav: boolean;
  private pageTitle: string;

  constructor(private _navigation: NavigationService, private _router: Router, private _elementRef: ElementRef, private _angulartics2: Angulartics2, private _angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
    this._router.events.subscribe((event: Event) => {
      if(event instanceof NavigationStart) {
        this._navigation.setCurrentRoute((<NavigationEnd>event).url);
        this._navigation.setBreadcrumbs(null); // Reset breadcrumbs before route change
        this._navigation.setPageTitle(null); // Reset page title before route change
        if(this._navigation.mediumScreenAndDown) {
          this._navigation.toggleSidenav(false); // Hide nav on initial load if smaller than large screen
        }
      } else if(event instanceof NavigationEnd) {
        let routerOutletComponent: HTMLElement = this._elementRef.nativeElement.getElementsByTagName('app-topnav')[0];
        routerOutletComponent.scrollIntoView(); // Scroll back to top after route change
      }
    });
    this._navigation.showSidenav.subscribe(showSidenav => {
      if(!showSidenav) {
        this.showSidenav = showSidenav;
      } else {
        this.showSidenav = showSidenav;
      }
    });
    this._navigation.pageTitle.subscribe(pageTitle => {
      this.pageTitle = pageTitle;
    });
  }

  private sidenavToggle(visible: boolean) {
    this._navigation.toggleSidenav(visible);
  }

  @HostListener('window:resize', ['$event'])
  private resize($event) {
    // Need this to trigger change detection for screen size changes!
    this._navigation.updateViewport();
  }
}
