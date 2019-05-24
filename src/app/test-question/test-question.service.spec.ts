import { TestBed } from '@angular/core/testing';

import { TestQuestionService } from './test-question.service';

describe('TestQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestQuestionService = TestBed.get(TestQuestionService);
    expect(service).toBeTruthy();
  });
});
