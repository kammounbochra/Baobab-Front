import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCategorieComponent } from './article-categorie.component';

describe('ArticleCategorieComponent', () => {
  let component: ArticleCategorieComponent;
  let fixture: ComponentFixture<ArticleCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
