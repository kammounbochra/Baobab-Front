import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JArticleComponent } from './j-article.component';

describe('JArticleComponent', () => {
  let component: JArticleComponent;
  let fixture: ComponentFixture<JArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
