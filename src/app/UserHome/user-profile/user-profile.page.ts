import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/Shared/alert-info/alert-service.service';
import { ChangePasswordPage } from 'src/app/UserHome/change-password/change-password.page';
import { EditProfilePage } from 'src/app/UserHome/edit-profile/edit-profile.page';
import { User } from 'src/class/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
user=new User();
  constructor(private modalController:ModalController,private alertservice:AlertService,private router:Router) {

   }

  ngOnInit() {
    this.GetUserDetails();
  }

  GetUserDetails()
  {
    if(localStorage.getItem('user'))
    {
      this.user=JSON.parse(localStorage.getItem('user'))
    }
  }


  async EditName() {
  const modal = await this.modalController.create({
    component: EditProfilePage,
    cssClass: 'my-custom-class',
    componentProps: {}    
  });
 
  modal.onDidDismiss().then(()=>
    {
      this.GetUserDetails();
    }
  
  )
  return await modal.present();
  
}

async ChangePassword()
{
  const modal = await this.modalController.create({
    component: ChangePasswordPage,
    cssClass: 'my-custom-class',
    componentProps: {}    
  });
 
  modal.onDidDismiss().then(()=>
    {
      this.GetUserDetails();
    }
  
  )
  return await modal.present();
}

DeleteAccount(){
  let that=this;
  this.alertservice.Alert("Are you sure you want to delete your account?",4,function(){
  let userdata=JSON.parse(localStorage.getItem('UsersList'))
  let index=userdata.findIndex(d=>d.Email==that.user.Email)
  userdata.splice(index,1)
  localStorage.setItem('UsersList',JSON.stringify(userdata))
  localStorage.removeItem('user');
  localStorage.removeItem('ReadLater');
  that.router.navigate(['login']);


  },function(){

  })

}

}
