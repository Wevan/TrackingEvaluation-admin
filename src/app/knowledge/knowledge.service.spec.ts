import { TestBed } from '@angular/core/testing';

import { KnowledgeService } from './knowledge.service';

describe('KnowledgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KnowledgeService = TestBed.get(KnowledgeService);
    expect(service).toBeTruthy();
  });
});
