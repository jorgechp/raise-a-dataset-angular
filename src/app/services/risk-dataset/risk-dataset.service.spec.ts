import {TestBed} from '@angular/core/testing';

import {RiskDatasetService} from './risk-dataset.service';

describe('RiskDatasetService', () => {
  let service: RiskDatasetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskDatasetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
