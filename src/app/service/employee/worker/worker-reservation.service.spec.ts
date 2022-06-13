import { TestBed } from '@angular/core/testing';

import { WorkerReservationService } from './worker-reservation.service';

describe('WorkerReservationService', () => {
  let service: WorkerReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
