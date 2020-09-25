import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaSocioComponent } from './estadistica-socio.component';

describe('EstadisticaSocioComponent', () => {
  let component: EstadisticaSocioComponent;
  let fixture: ComponentFixture<EstadisticaSocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticaSocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
