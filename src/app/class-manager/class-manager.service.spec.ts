import { TestBed } from '@angular/core/testing';

import { ClassManagerService } from './class-manager.service';

describe('ClassManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassManagerService = TestBed.get(ClassManagerService);
    expect(service).toBeTruthy();
  });
});
