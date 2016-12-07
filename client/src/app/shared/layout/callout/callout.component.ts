import {Component, HostBinding, Input} from '@angular/core';
import {StringUtils} from '../../utils/string-utils';

@Component({
  selector : 'c-callout',
  template : `
    <h4 *ngIf="!StringUtils.isEmpty(title)">{{title}}</h4>
    <ng-content></ng-content>
  `,
  styles : [`
    
  `]
})
export class CalloutComponent {
  @HostBinding('class') get class() {
    return `bs-callout bs-callout-${this.type}`;
  }

  @Input() title: number;
  @Input() type: string = 'success';

  private StringUtils: StringUtils = StringUtils;
}
