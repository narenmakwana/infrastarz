import {Component, OnInit} from '@angular/core';
import {MdSidenav} from '@angular/material';
import {Input} from '@angular/core/src/metadata/directives';
import {NavigationService} from '../navigation.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector : 'app-topnav',
  templateUrl : './topnav.component.html',
  styleUrls : ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  @Input() sideNav: MdSidenav;

  private _showSidenav: boolean;
  private _pageTitle: string;
  private _browserTitle: string;
  private _searchVal: string = '';
  private _searchValOld: string = '';
  private _isLoadingRoute: boolean = false;
  private _breadcrumbs: Array<{title: string, link: any[] | string}> = [];
  private _autoBreadcrumbs: boolean = true;

  private _breadcrumbInterval: number;
  private _pageTitleInterval: number;

  constructor(private _navigation: NavigationService, private _title: Title) {
  }

  ngOnInit() {
    this._navigation.isRouteLoading.subscribe(isRouteLoading => {
      this._isLoadingRoute = isRouteLoading;
    });
    this._navigation.showSidenav.subscribe(showSidenav => {
      this._showSidenav = showSidenav;
      if(this.sideNav !== undefined) {
        if(showSidenav && this.sideNav._isClosed) {
          this.sideNav.open();
        } else if(!showSidenav && this.sideNav._isOpened) {
          this.sideNav.close();
        }
      }
    });
    this._navigation.breadcrumbs.subscribe(breadcrumbs => {
      if(breadcrumbs !== null) {
        window.clearInterval(this._breadcrumbInterval);
        this._autoBreadcrumbs = false;
        this._breadcrumbs = breadcrumbs;
      } else {
        if(this._isLoadingRoute) {
          this._breadcrumbInterval = window.setInterval(() => {
            if(!this._isLoadingRoute) {
              window.clearInterval(this._breadcrumbInterval);
              this.updateAutoBreadcrumbs();
            }
          });
        } else {
          this.updateAutoBreadcrumbs();
        }
      }
    });
    this._navigation.pageTitle.subscribe(pageTitle => {
      if(pageTitle !== null) {
        window.clearInterval(this._pageTitleInterval);
        this._pageTitle = pageTitle;
        if(this._browserTitle === null) {
          this._title.setTitle(this._navigation.getAutoBrowserTitle(pageTitle));
        }
      } else {
        if(this._isLoadingRoute) {
          this._pageTitleInterval = window.setInterval(() => {
            if(!this._isLoadingRoute) {
              window.clearInterval(this._pageTitleInterval);
              this.updatePageTitle();
            }
          });
        } else {
          this.updatePageTitle();
        }
      }
    });
    this._navigation.browserTitle.subscribe(browserTitle => {
      this._browserTitle = browserTitle;
      if(browserTitle !== null) {
        this._title.setTitle(browserTitle);
      } else {
        this._title.setTitle(this._navigation.getAutoBrowserTitle(this._pageTitle));
      }
    });
  }

  toggleSidenav() {
    this._navigation.toggleSidenav(!this._showSidenav);
  }

  searchBlur() {
    this._searchValOld = this._searchVal;
    this._searchVal = '';
  }

  searchFocus() {
    this._searchVal = this._searchValOld;
  }

  private updateAutoBreadcrumbs() {
    this._navigation.currentRoute.take(1).subscribe(currentRoute => {
      this._autoBreadcrumbs = true;
      this._breadcrumbs = this._navigation.getAutoBreadcrumbs(currentRoute);
    });
  }

  private updatePageTitle() {
    this._navigation.currentRoute.take(1).subscribe(currentRoute => {
      this._pageTitle = this._navigation.getAutoPageTitle(currentRoute);
      if(this._browserTitle === null) {
        this._title.setTitle(this._navigation.getAutoBrowserTitle(this._pageTitle));
      }
    });
  }

}
