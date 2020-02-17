import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritAppComponent } from './inscrit-app.component';

describe('InscritAppComponent', () => {
  let component: InscritAppComponent;
  let fixture: ComponentFixture<InscritAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscritAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscritAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
