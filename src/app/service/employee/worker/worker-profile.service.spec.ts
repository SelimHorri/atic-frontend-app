import { TestBed } from '@angular/core/testing';

import { WorkerProfileService } from './worker-profile.service';

describe('WorkerProfileService', () => {
  let service: WorkerProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
