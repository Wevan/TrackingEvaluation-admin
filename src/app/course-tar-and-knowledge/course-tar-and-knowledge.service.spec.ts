import { TestBed } from '@angular/core/testing';

import { CourseTarAndKnowledgeService } from './course-tar-and-knowledge.service';

describe('CourseTarAndKnowledgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseTarAndKnowledgeService = TestBed.get(CourseTarAndKnowledgeService);
    expect(service).toBeTruthy();
  });
});
