import { TestBed } from '@angular/core/testing';

import { JournalistService } from './journalist.service';

describe('JournalistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JournalistService = TestBed.get(JournalistService);
    expect(service).toBeTruthy();
  });
});
