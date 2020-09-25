import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmProductoComponent } from './adm-producto.component';

describe('AdmProductoComponent', () => {
  let component: AdmProductoComponent;
  let fixture: ComponentFixture<AdmProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
