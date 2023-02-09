import { TestBed } from '@angular/core/testing';

import { MyEvaluationService } from './my-evaluationService.service';

describe('MyEvaluationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyEvaluationService = TestBed.get(MyEvaluationService);
    expect(service).toBeTruthy();
  });
});
