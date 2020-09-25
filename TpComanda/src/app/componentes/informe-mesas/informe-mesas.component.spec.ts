import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeMesasComponent } from './informe-mesas.component';

describe('InformeMesasComponent', () => {
  let component: InformeMesasComponent;
  let fixture: ComponentFixture<InformeMesasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeMesasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
