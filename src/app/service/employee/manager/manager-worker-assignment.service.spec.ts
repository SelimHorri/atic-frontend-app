import { TestBed } from '@angular/core/testing';

import { ManagerWorkerAssignmentService } from './manager-worker-assignment.service';

describe('ManagerWorkerAssignmentService', () => {
  let service: ManagerWorkerAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerWorkerAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
