import { TestBed } from '@angular/core/testing';

import { HealthLivenessService } from './health-liveness.service';

describe('HealthLivenessService', () => {
  let service: HealthLivenessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthLivenessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
