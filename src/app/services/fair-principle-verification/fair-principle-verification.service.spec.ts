import { TestBed } from '@angular/core/testing';

import { FairPrincipleVerificationService } from './fair-principle-verification.service';

describe('FairPrincipleVerificationService', () => {
  let service: FairPrincipleVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FairPrincipleVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
