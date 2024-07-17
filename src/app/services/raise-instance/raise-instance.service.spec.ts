import {TestBed} from '@angular/core/testing';

import {RaiseInstanceService} from './raise-instance.service';

describe('RaiseInstanceService', () => {
  let service: RaiseInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaiseInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
