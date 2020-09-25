import { TestBed } from '@angular/core/testing';

import { ProdcutosService } from './prodcutos.service';

describe('ProdcutosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdcutosService = TestBed.get(ProdcutosService);
    expect(service).toBeTruthy();
  });
});
