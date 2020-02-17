import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePaysComponent } from './article-pays.component';

describe('ArticlePaysComponent', () => {
  let component: ArticlePaysComponent;
  let fixture: ComponentFixture<ArticlePaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlePaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
