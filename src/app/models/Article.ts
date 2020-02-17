import { JournalistSignup } from './Journalist-signup';
import { ContentDetails } from './ContentDetails';
import {Country} from './Country';
import {Tags} from './Tags';

export class Article {
    id: any;
    date: Date;
    ContentDetails: ContentDetails;
    Author: JournalistSignup;
    link: string;
    status: any;
    Countries: Country;
    Tags: Tags;

}
