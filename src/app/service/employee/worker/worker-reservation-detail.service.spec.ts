import { TestBed } from '@angular/core/testing';

import { WorkerReservationDetailService } from './worker-reservation-detail.service';

describe('WorkerReservationDetailService', () => {
  let service: WorkerReservationDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerReservationDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
