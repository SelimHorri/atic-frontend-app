import { TestBed } from '@angular/core/testing';

import { ServiceDetailService } from './service-detail.service';

describe('ServiceDetailService', () => {
  let service: ServiceDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
