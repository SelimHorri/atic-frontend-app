import { TestBed } from '@angular/core/testing';

import { ManagerCategoryService } from './manager-category.service';

describe('ManagerCategoryService', () => {
  let service: ManagerCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
