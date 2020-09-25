import { TestBed } from '@angular/core/testing';

import { VerificarService } from './verificar.service';

describe('VerificarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerificarService = TestBed.get(VerificarService);
    expect(service).toBeTruthy();
  });
});
