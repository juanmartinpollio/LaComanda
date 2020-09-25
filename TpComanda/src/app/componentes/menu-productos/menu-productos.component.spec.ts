import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProductosComponent } from './menu-productos.component';

describe('MenuProductosComponent', () => {
  let component: MenuProductosComponent;
  let fixture: ComponentFixture<MenuProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
