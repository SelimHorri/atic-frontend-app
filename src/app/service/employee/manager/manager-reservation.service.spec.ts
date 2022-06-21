import { TestBed } from '@angular/core/testing';

import { ManagerReservationService } from './manager-reservation.service';

describe('ManagerReservationService', () => {
  let service: ManagerReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
