import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/class/AppConfig';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  appconfig=new AppConfig();
  constructor(public http: HttpClient) { 


  }

  GetArticles():Observable<any> 
  {
    return this.http.get("https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key="+this.appconfig.ApiKey);
  }
}
