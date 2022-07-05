import { TestBed } from '@angular/core/testing';

import { WorkerReservationTaskService } from './worker-reservation-task.service';

describe('WorkerReservationTaskService', () => {
  let service: WorkerReservationTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerReservationTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
