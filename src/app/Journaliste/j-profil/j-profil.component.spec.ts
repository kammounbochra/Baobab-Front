import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JProfilComponent } from './j-profil.component';

describe('JProfilComponent', () => {
  let component: JProfilComponent;
  let fixture: ComponentFixture<JProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
