import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuJComponent } from './menu-j.component';

describe('MenuJComponent', () => {
  let component: MenuJComponent;
  let fixture: ComponentFixture<MenuJComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuJComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuJComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
