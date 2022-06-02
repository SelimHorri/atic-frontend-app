import { TestBed } from '@angular/core/testing';

import { CustomerReservationService } from './customer-reservation.service';

describe('CustomerReservationService', () => {
  let service: CustomerReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
