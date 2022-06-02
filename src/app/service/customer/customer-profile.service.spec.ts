import { TestBed } from '@angular/core/testing';

import { CustomerProfileService } from './customer-profile.service';

describe('CustomerProfileService', () => {
  let service: CustomerProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
