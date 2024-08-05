import { TestBed } from '@angular/core/testing';

import { FairPrincipleService } from './fair-principle.service';

describe('FairPrincipleService', () => {
  let service: FairPrincipleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FairPrincipleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
