import { TestBed } from '@angular/core/testing';

import { CourseTargetService } from './course-target.service';

describe('CourseTargetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseTargetService = TestBed.get(CourseTargetService);
    expect(service).toBeTruthy();
  });
});
