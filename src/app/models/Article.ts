import { JournalistSignup } from './Journalist-signup';
import { ContentDetails } from './ContentDetails';
import {Country} from './Country';
import {Tags} from './Tags';
import {Category} from './Category';
import {ArticleTags} from './Article_tags';

export class Article {
    id: any;
    date: Date;
    contentDetails: ContentDetails;
    author: JournalistSignup;
    link: string;
    status: any;
    countries: Country;
  tags: Tags;
  articletags : ArticleTags;
  categories : Category ;


}
