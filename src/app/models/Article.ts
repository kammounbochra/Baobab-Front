import { JournalistSignup } from './Journalist-signup';
import { ContentDetails } from './ContentDetails';
import {Country} from './Country';
import {Tags} from './Tags';
import {Category} from './Category';
import {ArticleTags} from './Article_tags';
import {ArticleContent} from './Article_content';

export class Article {
  idArticle: any;
    date: Date;
  contentDetails: ContentDetails;
    author: JournalistSignup;
    link: string;
    status: any;
    countries: Country;
  tags: ArticleTags;
  articletags : ArticleTags;
  categories : Category ;
  articleContent: ArticleContent;

}
