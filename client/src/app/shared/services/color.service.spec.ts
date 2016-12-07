/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ColorService } from './color.service';

describe('ColorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorService]
    });
  });

  it('should ...', inject([ColorService], (service: ColorService) => {
    expect(service).toBeTruthy();
  }));
});
