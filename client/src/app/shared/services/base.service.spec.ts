/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { BaseService } from './base.service';

describe('Service: Base', () => {
  beforeEach(() => {
    addProviders([BaseService]);
  });

  it('should ...',
    inject([BaseService],
      (service: BaseService) => {
        expect(service).toBeTruthy();
      }));
});
