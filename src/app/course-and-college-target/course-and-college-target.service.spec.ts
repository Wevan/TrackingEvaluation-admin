import { TestBed } from '@angular/core/testing';

import { CourseAndCollegeTargetService } from './course-and-college-target.service';

describe('CourseAndCollegeTargetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseAndCollegeTargetService = TestBed.get(CourseAndCollegeTargetService);
    expect(service).toBeTruthy();
  });
});
