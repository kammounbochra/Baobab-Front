import { TestBed } from '@angular/core/testing';

import { ModerateurService } from './moderateur.service';

describe('ModerateurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModerateurService = TestBed.get(ModerateurService);
    expect(service).toBeTruthy();
  });
});
