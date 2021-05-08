import { TestBed } from '@angular/core/testing';

import { TestCreatingService } from './test-creating.service';

describe('TestCreatingService', () => {
  let service: TestCreatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestCreatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
