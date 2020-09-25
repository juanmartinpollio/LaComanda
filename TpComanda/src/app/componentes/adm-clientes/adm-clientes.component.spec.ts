import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmClientesComponent } from './adm-clientes.component';

describe('AdmClientesComponent', () => {
  let component: AdmClientesComponent;
  let fixture: ComponentFixture<AdmClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
