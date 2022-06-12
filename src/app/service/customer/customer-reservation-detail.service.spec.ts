import { TestBed } from '@angular/core/testing';

import { CustomerReservationDetailService } from './customer-reservation-detail.service';

describe('CustomerReservationDetailService', () => {
  let service: CustomerReservationDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerReservationDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
