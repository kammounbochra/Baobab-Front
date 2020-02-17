import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAppComponent } from './article-app.component';

describe('ArticleAppComponent', () => {
  let component: ArticleAppComponent;
  let fixture: ComponentFixture<ArticleAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
