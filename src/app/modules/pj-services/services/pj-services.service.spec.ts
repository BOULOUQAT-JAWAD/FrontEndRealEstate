import { TestBed } from '@angular/core/testing';

import { PjServicesService } from './pj-services.service';

describe('PjServicesService', () => {
  let service: PjServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PjServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
