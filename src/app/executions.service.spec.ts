import { TestBed } from '@angular/core/testing';

import { ExecutionsService } from './executions.service';

describe('ExecutionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExecutionsService = TestBed.get(ExecutionsService);
    expect(service).toBeTruthy();
  });
});
