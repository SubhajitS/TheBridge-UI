import { TestBed } from '@angular/core/testing';

import { DealHandService } from './deal-hand.service';

describe('DealHandService', () => {
  let service: DealHandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealHandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
