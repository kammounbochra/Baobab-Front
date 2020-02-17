import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtcileSuppComponent } from './artcile-supp.component';

describe('ArtcileSuppComponent', () => {
  let component: ArtcileSuppComponent;
  let fixture: ComponentFixture<ArtcileSuppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtcileSuppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtcileSuppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
