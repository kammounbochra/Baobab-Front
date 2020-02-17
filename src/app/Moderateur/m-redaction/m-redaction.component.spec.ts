import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MRedactionComponent } from './m-redaction.component';

describe('MRedactionComponent', () => {
  let component: MRedactionComponent;
  let fixture: ComponentFixture<MRedactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MRedactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MRedactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
