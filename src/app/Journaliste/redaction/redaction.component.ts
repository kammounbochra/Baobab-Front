import {Component, Input, OnInit} from '@angular/core';
import {  EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Article} from '../../models/Article';
import {Country} from '../../models/Country';
@Component({
  selector: 'app-redaction',
  templateUrl: './redaction.component.html',
  styleUrls: ['./redaction.component.scss']
})
export class RedactionComponent implements OnInit {
  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: 'insert content...'
  };
  @Input() art: Article;
  articles: Article[];
  @Input()countries: Country;
  country: Country[];
  optionsSelect: Array<any>;

  f: FormGroup;

  constructor() {}

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
