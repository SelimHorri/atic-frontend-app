import { TestBed } from '@angular/core/testing';

import { RegistrationGuard } from './registration.guard';

describe('RegistrationGuard', () => {
  let guard: RegistrationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegistrationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
