import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePedidosComponent } from './informe-pedidos.component';

describe('InformePedidosComponent', () => {
  let component: InformePedidosComponent;
  let fixture: ComponentFixture<InformePedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformePedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
