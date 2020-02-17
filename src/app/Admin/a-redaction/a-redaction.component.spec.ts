import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ARedactionComponent } from './a-redaction.component';

describe('ARedactionComponent', () => {
  let component: ARedactionComponent;
  let fixture: ComponentFixture<ARedactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ARedactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ARedactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
