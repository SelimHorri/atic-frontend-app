import { TestBed } from '@angular/core/testing';

import { WorkerGuard } from './worker.guard';

describe('WorkerGuard', () => {
  let guard: WorkerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WorkerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
