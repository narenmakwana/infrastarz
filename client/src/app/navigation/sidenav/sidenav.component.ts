import {Component, OnInit, trigger, state, animate, transition, style, QueryList} from '@angular/core';
import {NavigationService} from '../navigation.service';
import {MenuItem} from '../menu-item';
import {SidenavItemComponent} from './sidenav-item/sidenav-item.component';
import {ViewChildren} from '@angular/core/src/metadata/di';

@Component({
  selector : 'app-sidenav',
  templateUrl : './sidenav.component.html',
  styleUrls : ['./sidenav.component.scss'],
  animations : [
    trigger('flyInOut', [
      state('in', style({transform : 'translateX(0)'})),
      transition('void => *', [
        style({transform : 'translateX(-100%)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(0, style({transform : 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {
  @ViewChildren(SidenavItemComponent) children: QueryList<SidenavItemComponent>;

  private showSidenav: boolean = false;
  private menuItems: MenuItem[] = [];
  private _screenWidth: number = NavigationService.largeViewportWidth;
  private _initialLoad: boolean = true; // Used to show slide in effect on page load for sidenav
  private _this: SidenavComponent = this;

  constructor(private _navigation: NavigationService) {
  }

  ngOnInit() {
    this._navigation.showSidenav.subscribe(showSidenav => {
      if(this._initialLoad) {
        this._initialLoad = false;
        window.setTimeout(() => {
          this.showSidenav = showSidenav;
        }, 300);
      } else {
        this.showSidenav = showSidenav;
      }
    });
    this._navigation.menuItems.subscribe(menuItems => {
      this.menuItems = menuItems;
    });
    this._navigation.windowSize.subscribe(width => {
      if(this._screenWidth > NavigationService.largeViewportWidth && width < NavigationService.largeViewportWidth && this.showSidenav) {
        this._navigation.toggleSidenav(false);
      } else if(this._screenWidth < NavigationService.largeViewportWidth && width > NavigationService.largeViewportWidth) {
        this._navigation.toggleSidenav(true);
      }
      this._screenWidth = width;
    });
  }

  get height(): number {
    let addedHeight = 0;
    if(this.children) {
      this.children.forEach(childComponent => {
        if(childComponent.active) {
          addedHeight += childComponent.height;
        }
      });
    }
    return (this.menuItems.length * 48) + addedHeight;
  }

  toggle(active: boolean, child: SidenavItemComponent) {
    if(this.children) {
      this.children.forEach(childComponent => {
        if(child !== childComponent) {
          childComponent.toggle(false, undefined, true);
        }
      });
    }
  }

}
