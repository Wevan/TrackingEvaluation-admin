import { TestBed } from '@angular/core/testing';

import { CollegeTargetRelationService } from './college-target-relation.service';

describe('CollegeTargetRelationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollegeTargetRelationService = TestBed.get(CollegeTargetRelationService);
    expect(service).toBeTruthy();
  });
});
