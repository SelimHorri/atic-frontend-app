import { TestBed } from '@angular/core/testing';

import { CustomerFavouriteService } from './customer-favourite.service';

describe('CustomerFavouriteService', () => {
  let service: CustomerFavouriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerFavouriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
