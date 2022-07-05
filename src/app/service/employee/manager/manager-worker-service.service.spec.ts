import { TestBed } from '@angular/core/testing';

import { ManagerWorkerServiceService } from './manager-worker-service.service';

describe('ManagerWorkerServiceService', () => {
  let service: ManagerWorkerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerWorkerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
