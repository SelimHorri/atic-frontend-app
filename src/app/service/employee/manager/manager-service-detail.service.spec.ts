import { TestBed } from '@angular/core/testing';

import { ManagerServiceDetailService } from './manager-service-detail.service';

describe('ManagerServiceDetailService', () => {
  let service: ManagerServiceDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerServiceDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
