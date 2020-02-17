import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JListeComponent } from './j-liste.component';

describe('JListeComponent', () => {
  let component: JListeComponent;
  let fixture: ComponentFixture<JListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
