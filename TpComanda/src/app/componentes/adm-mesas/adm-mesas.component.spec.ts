import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmMesasComponent } from './adm-mesas.component';

describe('AdmMesasComponent', () => {
  let component: AdmMesasComponent;
  let fixture: ComponentFixture<AdmMesasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmMesasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
