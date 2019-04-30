import { TestBed } from '@angular/core/testing';

import { ImportExcelService } from './import-excel.service';

describe('ImportExcelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportExcelService = TestBed.get(ImportExcelService);
    expect(service).toBeTruthy();
  });
});
