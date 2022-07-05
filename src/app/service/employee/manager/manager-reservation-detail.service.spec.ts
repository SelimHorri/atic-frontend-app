import { TestBed } from '@angular/core/testing';

import { ManagerReservationDetailService } from './manager-reservation-detail.service';

describe('ManagerReservationDetailService', () => {
  let service: ManagerReservationDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerReservationDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
