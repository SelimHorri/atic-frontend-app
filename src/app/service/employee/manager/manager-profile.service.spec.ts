import { TestBed } from '@angular/core/testing';

import { ManagerProfileService } from './manager-profile.service';

describe('ManagerProfileService', () => {
  let service: ManagerProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
