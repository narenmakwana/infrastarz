import {Injectable} from '@angular/core';

declare var palette: any;

@Injectable()
export class ColorService {

  constructor() {
  }

  getColor(mdPalette: string, hue: string): string {
    return palette.get(this.transformColor(mdPalette), hue);
  }

  getTextColor(mdPalette: string, hue: string, shade: string): string {
    return palette.getText(this.transformColor(mdPalette), hue, shade);
  }

  private transformColor(palette: string): string {
    if(palette.indexOf('md-') === 0) {
      palette = palette.substring(3); // Remove md- from beginning
    }
    let split: string[] = palette.split('-');
    if(split.length === 0) {
      split = palette.split(' ');
    }
    if(split.length > 0) {
      for (let i=0;i<split.length;i++) {
        split[i] = split[i].charAt(0).toUpperCase() + split[i].substring(1);
      }
      palette = split.join(' ');
    }
    return palette.charAt(0).toUpperCase() + palette.substring(1);
  }

}
