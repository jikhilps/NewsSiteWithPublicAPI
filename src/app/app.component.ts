import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SectionService } from 'src/service/section.service';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  SectionList: any[] = [];
  Section:string='';
  public Pages = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'Profile', url: 'user-profile', icon: 'people-circle' },
    { title: 'Read Later', url: 'read-later', icon: 'bookmarks' },


  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router, private sectionservice: SectionService,private menucontroller:MenuController) {

  }

  ngOnInit() {
    this.GetAllSections();
  }

  GetAllSections() {
    this.sectionservice.GetSections().subscribe(data => {
      if (data) {
        this.SectionList = <Array<any>>data.results;
       

      } else {
        this.SectionList = [];
      }
    })
  }

  OpenPage(url) {
    this.router.navigate([url]);
  }

  FilterSections(label){
    this.menucontroller.close();
    this.sectionservice.SharedEvent.emit({ Data: label.section});
  }
 
}
