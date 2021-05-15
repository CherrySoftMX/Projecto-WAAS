import { TestBed } from '@angular/core/testing';

import { DealsServiceService } from './deals-service.service';

describe('DealsServiceService', () => {
  let service: DealsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
