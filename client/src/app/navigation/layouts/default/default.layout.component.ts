import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../navigation.service';

@Component({
  templateUrl : './default.layout.component.html',
  styleUrls : ['./default.layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  private showSidenav: boolean;

  constructor(private _navigation: NavigationService) {
  }

  ngOnInit() {
    this._navigation.showSidenav.subscribe(showSidenav => {
      if(!showSidenav) {
        this.showSidenav = showSidenav;
      } else {
        this.showSidenav = showSidenav;
      }
    });
  }

  private sidenavToggle(visible: boolean) {
    this._navigation.toggleSidenav(visible);
  }

}
