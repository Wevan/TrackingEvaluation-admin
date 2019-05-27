import { TestBed } from '@angular/core/testing';

import { CourseDirectionService } from './course-direction.service';

describe('CourseDirectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseDirectionService = TestBed.get(CourseDirectionService);
    expect(service).toBeTruthy();
  });
});
