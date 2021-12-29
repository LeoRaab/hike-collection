import { TestBed } from '@angular/core/testing';

import { HikeService } from './hike.service';

describe('HikeService', () => {
  let service: HikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
