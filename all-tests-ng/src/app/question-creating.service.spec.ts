import { TestBed } from '@angular/core/testing';

import { QuestionCreatingService } from './question-creating.service';

describe('QuestionCreatingService', () => {
  let service: QuestionCreatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionCreatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
