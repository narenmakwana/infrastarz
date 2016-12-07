import {Component, Input, ElementRef, AfterViewInit, Output, EventEmitter} from '@angular/core';
declare var $: any;

@Component({
  selector : 'c-chip',
  template : `
    <div class="chips" materialize="material_chip" [materializeParams]="[materializeParams]">
    </div>
  `,
  styles : []
})
export class ChipComponent implements AfterViewInit {
  @Input() placeholder: {placeholder: string, secondaryPlaceholder: string} = {placeholder : '', secondaryPlaceholder : ''};
  @Input() tags: string[] | {tag: string, image: string}[] = [];

  @Output() chipAdded = new EventEmitter();
  @Output() chipDeleted = new EventEmitter();
  @Output() chipSelected = new EventEmitter();

  private get data(): {tag: string, image: string}[] {
    if(this.tags.length > 0) {
      if(typeof this.tags[0] === 'string') {
        let data: {tag: string, image: string}[] = [];
        for (let i = 0; i < this.tags.length; i++) {
          data.push({tag : <string>this.tags[i], image : null});
        }
        return data;
      } else {
        return <{tag: string, image: string}[]>this.tags;
      }
    } else {
      return [];
    }
  }

  private get materializeParams(): {placeholder: string, secondaryPlaceholder: string, data: {tag: string, image?: string}[]} {
    return {
      placeholder : this.placeholder.placeholder,
      secondaryPlaceholder : this.placeholder.secondaryPlaceholder,
      data : this.data
    };
  }

  constructor(private _elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    let chip = $(this._elementRef.nativeElement).find('.chips');
    chip.on('chip.add', (e, chip) => {
      this.chipAdded.emit(chip);
    });
    chip.on('chip.delete', (e, chip) => {
      this.chipDeleted.emit(chip);
    });
    chip.on('chip.select', (e, chip) => {
      this.chipSelected.emit(chip);
    });
  }

}
