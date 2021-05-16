import { TestBed } from '@angular/core/testing';

import { StoresServiceService } from './stores-service.service';

describe('StoresServiceService', () => {
  let service: StoresServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoresServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
