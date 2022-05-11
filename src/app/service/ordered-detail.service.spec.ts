import { TestBed } from '@angular/core/testing';

import { OrderedDetailService } from './ordered-detail.service';

describe('OrderedDetailService', () => {
  let service: OrderedDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderedDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
