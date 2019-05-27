import { TestBed } from '@angular/core/testing';

import { WaysService } from './ways.service';

describe('WaysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaysService = TestBed.get(WaysService);
    expect(service).toBeTruthy();
  });
});
