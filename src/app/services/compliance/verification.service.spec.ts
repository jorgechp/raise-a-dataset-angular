import { TestBed } from '@angular/core/testing';

import { ComplianceService } from './compliance.service';

describe('ValidationnService', () => {
  let service: ComplianceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplianceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
