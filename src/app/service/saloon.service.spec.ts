import { TestBed } from '@angular/core/testing';

import { SaloonService } from './saloon.service';

describe('SaloonService', () => {
  let service: SaloonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaloonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
