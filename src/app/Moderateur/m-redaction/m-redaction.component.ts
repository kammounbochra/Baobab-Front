import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Article} from '../../models/Article';
import {Country} from '../../models/Country';
import {Category} from '../../models/Category';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-m-redaction',
  templateUrl: './m-redaction.component.html',
  styleUrls: ['./m-redaction.component.scss']
})
export class MRedactionComponent implements OnInit {

  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: 'insert content...'
  };
  @Input() art: Article;
  articles: Article[];
  @Input()countries: Country;
  countrys: Country[];
  optionsSelect: Array<any>;
  @Input() cat: Category;
  categorys: Category[];
  f: FormGroup;

  constructor( private categoryService : CategoryService) {}

  ngOnInit() {
    setTimeout(() => {
      this.editorContent = '<h1>content changed!</h1>';
      console.log('you can use the quill instance object to do something', this.editor);
      // this.editor.disable();
    }, 2800);

    this.optionsSelect = [
      { value: 'Feedback', label: 'Feedback' },
      { value: 'Report a bug', label: 'Report a bug' },
      { value: 'Feature request', label: 'Feature request' },
      { value: 'Other stuff', label: 'Other stuff' },
    ];
    this.categoryService.getCategoryList().subscribe(dat => {
      this.categorys = dat;  console.log(dat) ;
    });
  }

  onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({ quill, html, text }) {
    console.log('quill content is changed!', quill, html, text);
  }

}
