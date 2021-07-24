import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-read-later',
  templateUrl: './read-later.page.html',
  styleUrls: ['./read-later.page.scss'],
})
export class ReadLaterPage implements OnInit {
  ReadLaterList:any[]=[];
  IsLoaded:boolean=false;
  constructor(private toastController:ToastController) { }

  ngOnInit() {
  
  }

  ionViewWillEnter()
  {
    this.GetAllReadLaterArticle();
  }

  GetAllReadLaterArticle(){
    if(localStorage.getItem('ReadLater')){
      this.ReadLaterList=JSON.parse(localStorage.getItem('ReadLater'));

    }
    this.IsLoaded=true;
  }

  OpenArticle(articleURL)
  {
    window.open(articleURL,"_blank")
  }

  DeleteArticle(article)
  {
    let indx=(this.ReadLaterList.findIndex(x=> x.url==article.url))
    this.ReadLaterList.splice(indx,1)
    localStorage.setItem('ReadLater',JSON.stringify(this.ReadLaterList));
    this.presentToast();

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Article removed from read later',
      duration: 1000,
      position: 'bottom'
    });
    toast.present();
  }


}
