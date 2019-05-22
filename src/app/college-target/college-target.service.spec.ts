import { TestBed } from '@angular/core/testing';

import { CollegeTargetService } from './college-target.service';

describe('CollegeTargetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollegeTargetService = TestBed.get(CollegeTargetService);
    expect(service).toBeTruthy();
  });
});
