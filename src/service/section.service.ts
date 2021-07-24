import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/class/AppConfig';
@Injectable({
  providedIn: 'root'
})
export class SectionService {
  SharedEvent: EventEmitter<any> = new EventEmitter();
appconfig=new AppConfig();
  constructor(public http: HttpClient) { }
 

  
  GetSections():Observable<any> 
  {
    return this.http.get("https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key="+this.appconfig.ApiKey);
  }
}
