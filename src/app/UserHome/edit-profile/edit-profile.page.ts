import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/Shared/alert-info/alert-service.service';
import { User } from 'src/class/User';
import { ValidationService } from 'src/service/validation.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  user=new User();
  UsersList:any[]=[];
  constructor(private alertservice:AlertService,private validationservice:ValidationService,private modalcontroller:ModalController) { }

  ngOnInit() {
  
  this.GetUserData();
   this.GetUsersList();
  }
  GetUserData(){
    if(localStorage.getItem('user')){
      this.user=JSON.parse(localStorage.getItem('user'));
    }
  }

  GetUsersList(){
    if(localStorage.getItem('UsersList')){
      this.UsersList=JSON.parse(localStorage.getItem('UsersList'));
    }
  }

  Back()
  {
    this.modalcontroller.dismiss();
  }


  Submit(){
    if(this.validationservice.ValidateName(this.user.Name,true)){
       this.UsersList.filter(d=>d.Email==this.user.Email)[0].Name=this.user.Name;
       localStorage.setItem('UsersList',JSON.stringify(this.UsersList));
       localStorage.setItem('user',JSON.stringify(this.user));
       this.modalcontroller.dismiss();
    }

  }


 

}
