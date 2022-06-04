import { TestBed } from '@angular/core/testing';

import { SaloonDetailGuard } from './saloon-detail.guard';

describe('SaloonDetailGuard', () => {
  let guard: SaloonDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SaloonDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
