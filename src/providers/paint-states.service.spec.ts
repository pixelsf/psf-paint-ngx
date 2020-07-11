import { TestBed } from '@angular/core/testing';

import { PaintStatesService } from './paint-states.service';

describe('PaintStatesService', () => {
  let service: PaintStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaintStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
