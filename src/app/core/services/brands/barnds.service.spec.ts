import { TestBed } from '@angular/core/testing';

import { BarndsService } from './barnds.service';

describe('BarndsService', () => {
  let service: BarndsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarndsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
