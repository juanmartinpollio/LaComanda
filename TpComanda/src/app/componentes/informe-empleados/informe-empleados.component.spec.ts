import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeEmpleadosComponent } from './informe-empleados.component';

describe('InformeEmpleadosComponent', () => {
  let component: InformeEmpleadosComponent;
  let fixture: ComponentFixture<InformeEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
