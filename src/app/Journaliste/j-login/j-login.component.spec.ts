import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JLoginComponent } from './j-login.component';

describe('JLoginComponent', () => {
  let component: JLoginComponent;
  let fixture: ComponentFixture<JLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
