import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmEmpleadosComponent } from './adm-empleados.component';

describe('AdmEmpleadosComponent', () => {
  let component: AdmEmpleadosComponent;
  let fixture: ComponentFixture<AdmEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
