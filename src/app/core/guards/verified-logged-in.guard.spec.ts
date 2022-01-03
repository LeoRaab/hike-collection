import { TestBed } from '@angular/core/testing';

import { VerifiedLoggedInGuard } from './verified-logged-in.guard';

describe('VerifiedLoggedInGuard', () => {
  let guard: VerifiedLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifiedLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
