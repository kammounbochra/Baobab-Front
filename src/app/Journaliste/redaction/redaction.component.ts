import {Component, Input, OnInit} from '@angular/core';
import {  EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Article} from '../../models/Article';
import {Country} from '../../models/Country';
import {CountryService} from '../../services/country.service';
import { Tags } from '../../models/Tags';
import { TagService } from '../../services/tag.service';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { ContentDetails } from 'src/app/models/ContentDetails';
import { Language } from 'src/app/models/Language';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import {ArticleCountry} from '../../models/ArtcileCountry';
@Component({
  selector: 'app-redaction',
  templateUrl: './redaction.component.html',
  styleUrls: ['./redaction.component.scss']
})
export class RedactionComponent implements OnInit {
  public editor;
  public editorOptions = {
    placeholder: 'insert content...'
  };
  private error: any;
  @Input() art: Article;
  articles: Article[];

  article: Article = new Article();

  @Input()category: Category;
  categories: Category[];
  catchecked: Category = {}as Category;
   cd: ContentDetails = new ContentDetails();
  contentdetails: ContentDetails = new ContentDetails();
  @Input()content: ContentDetails;

  optionsSelect: Array<any>;

  articleform: FormGroup;

  @Input()language:  Language;
  langSelected: Language = {} as Language;

  countrySelected: Country = {} as Country ;
  @Input() country: Country;
  countrys: Country[];

  articleCountry: ArticleCountry = {} as ArticleCountry ;

  tagSelected: Tags = {} as Tags;
  @Input()tags: Tags;
  tagss: Tags[];

  languages = ['FR', 'FR'];

  constructor( private countryService: CountryService, private articleService: ArticleService , private tagService: TagService, private categoryService: CategoryService, private fb: FormBuilder, private toastrService: ToastService) {}

  ngOnInit() {
    setTimeout(() => {
      console.log('you can use the quill instance object to do something', this.editor);
      // this.editor.disable();
    }, 2800);
    // this.articleform=this.fb.group({
    //   titre: ['', Validators.required],
    //   tags: ['', Validators.required],
    //   country: ['', Validators.required],
    //   contentDetails:['',Validators.required]
    // });
    this.countryService.getCountryList().subscribe(da => {
        console.log(da);
        this.countrys = da;
      }
    );
    this.tagService.getTagList().subscribe(da => {
      console.log(da);
      this.tagss = da;
    });
      this.categoryService.getCategoryList().subscribe(dat => {
        console.log(dat);
        this.categories = dat;
      });


  }

  get f(){
    return this.articleform.controls;
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

  showInfo() {
    this.toastrService.info('Votre inscription est enregistré ');
  }
  showWarning() {
    this.toastrService.warning('Vérifier les champs');
  }
  addArticle() {

 /*   this.tagService.getTag(this.article.tags).subscribe(res => {
      this.tagSelected = res;
      this.article.articletags.tags = this.tagSelected;
      console.log(this.article.tags)});*/

    this.countryService.getCountry(this.article.articleCountry.country).subscribe(res => {
      this.countrySelected = res;
      this.article.articleCountry.country = this.countrySelected;
      console.log(this.article.articleCountry);
    });
    this.categoryService.getCategory(this.article.categories).subscribe(res => {
      this.catchecked = res;
      this.article.categories = this.catchecked;
      console.log(this.article.categories);
    });

    this.articleService.AddArticle(this.article).subscribe(data => {
      console.log('article insertion', data);
      this.article = data as Article;
      console.log('aaa' , this.article);
    });
    this.article = new Article();
    this.countrySelected = new Country();
   this.tagSelected = new Tags();
   this.catchecked = new Category();

  }
}
