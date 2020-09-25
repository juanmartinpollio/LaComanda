import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarCuentasComponent } from './administrar-cuentas.component';

describe('AdministrarCuentasComponent', () => {
  let component: AdministrarCuentasComponent;
  let fixture: ComponentFixture<AdministrarCuentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarCuentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
