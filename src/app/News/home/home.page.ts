import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../Shared/alert-info/alert-service.service';
import { SectionService } from 'src/service/section.service';
import { ArticleService } from 'src/service/article.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  ArticleList:any[]=[];
  ArticleListFilter:any[]=[];
  IsLoaded:boolean=false;
  ReadLaterList:any[]=[];

  constructor(private router:Router,private alertservice:AlertService,
    private sectionservice:SectionService,private articleservice:ArticleService,public toastController: ToastController) {

      this.sectionservice.SharedEvent.subscribe(data => {
        if (data) {
          this.IsLoaded=false;
          // if(this.ArticleList.find(d=>d.section.toString().toLowerCase()==data.Data.toString().toLowerCase())) {
            this.ArticleListFilter=this.ArticleList.filter(d=>d.section.toString().toLowerCase()==data.Data.toString().toLowerCase())
            this.IsLoaded=true;
          // }
           
        }
      })

     }

  ngOnInit() {

  }

  ionViewWillEnter(){
     this.GetAllArticles()
     this.GetAllReadLaterArticle();
  }

  
  ReadLater(article){
    if(this.ReadLaterList.find(art=>art==article)){
     
    }else{
      this.ReadLaterList.push(article);
      localStorage.setItem('ReadLater',JSON.stringify(this.ReadLaterList));
      this.presentToast();
    }

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Article added to read later',
      duration: 1000,
      position: 'bottom'
    });
    toast.present();
  }

  CheckIfAddedToReadLater(article){
    if(localStorage.getItem('ReadLater')){
      let readlist=JSON.parse(localStorage.getItem('ReadLater'))
      if(readlist.find(art=>art.url===article.url)){
        return true
  
      }else{
        return false;
      }
    }else{
      return false;
    }
    

    

  }


  GetAllReadLaterArticle(){
    if(localStorage.getItem('ReadLater')){
      this.ReadLaterList=JSON.parse(localStorage.getItem('ReadLater'));

    }
  }


  GetAllArticles(){
    this.articleservice.GetArticles().subscribe(data=>{
      if(data){
        this.ArticleList=<Array<any>>data.results;
        this.ArticleListFilter=this.ArticleList;
        this.IsLoaded=true;
      }else{
        this.ArticleList=[];
        this.ArticleListFilter=[];
        this.IsLoaded=true;
      }
    })
  }

  LogOut(){
   let that=this
   this.alertservice.Alert("Are you sure you want to leave?",4,function(){
    localStorage.removeItem('user');
    localStorage.removeItem('ReadLater');
    that.router.navigate(['login']);
   },function(){

   })
    
  }


  OpenArticle(articleURL)
  {
    window.open(articleURL,"_blank")
  }

}
