import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JSignUpComponent } from './j-sign-up.component';

describe('JSignUpComponent', () => {
  let component: JSignUpComponent;
  let fixture: ComponentFixture<JSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
