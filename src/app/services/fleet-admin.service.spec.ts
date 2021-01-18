import { TestBed } from '@angular/core/testing';

import { FleetAdminService } from './fleet-admin.service';

describe('FleetAdminService', () => {
  let service: FleetAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
