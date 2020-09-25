import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarPedidosComponent } from './realizar-pedidos.component';

describe('RealizarPedidosComponent', () => {
  let component: RealizarPedidosComponent;
  let fixture: ComponentFixture<RealizarPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
