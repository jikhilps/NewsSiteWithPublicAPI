import { Component, OnInit } from '@angular/core';
import { User } from 'src/class/User';
import { AlertService } from '../alert-info/alert-service.service';
import { ValidationService } from 'src/service/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = new User();
  UsersList:any[]=[];
  Islogin: boolean = true;
  Isregister: boolean = false;
  isSubmit: boolean = false;
  constructor(private alertinfoservice:AlertService,private validateservice:ValidationService,
    private router:Router) { }

  ngOnInit() {

  }


  ionViewWillEnter(){
    if(localStorage.getItem('user')){
     this.router.navigate(['home']);
    }

    if(localStorage.getItem('UsersList')){
      this.UsersList=JSON.parse(localStorage.getItem('UsersList'));
    }else{
      this.UsersList=[];
    }
  }


  Login(){
    if(this.validateservice.ValidateEmail(this.user.Email,true)){
     if(this.UsersList.length>0){
       let userdata=this.UsersList.find(d=>d.Email==this.user.Email && d.Password==this.user.Password)
       if(!!userdata){

        localStorage.setItem('user',JSON.stringify(userdata));
        this.router.navigate(['/home']);

       }else{
         this.alertinfoservice.Alert("Invalid login credentials",2,function(){},function(){});
       }

     }else{
       this.alertinfoservice.Alert("please register and continue",2,function(){},function(){});
     }
    }
  }

  Register(){
    if(this.validateservice.ValidateName(this.user.Name,true) && 
      this.validateservice.ValidateEmail(this.user.Email,true) &&
      this.validateservice.ValidatePassword(this.user.Password,true)
      ){

        if(this.UsersList.length>0){
          if(this.UsersList.find(user=>user.Email==this.user.Email)){
            this.alertinfoservice.Alert("Email already registered",2,function(){},function(){});
            return;
          }else{
            this.UsersList.push(this.user);
          localStorage.setItem('UsersList',JSON.stringify(this.UsersList));
          this.user=new User();
          this.ToggleControl(1);
          this.alertinfoservice.Alert("Registration successful, please login and continue",1,function(){},function(){});
          
        }
        }else{

          this.UsersList.push(this.user);
          localStorage.setItem('UsersList',JSON.stringify(this.UsersList));
          this.user=new User();
          this.ToggleControl(1);
          this.alertinfoservice.Alert("Registration successful, please login and continue",1,function(){},function(){});

        }

    }
   
  }

  ToggleControl(val) {
    if (val == 1) {
      this.Islogin = true;
      this.Isregister = false;
      this.isSubmit = false;
    }
    else if (val == 2) {
      this.Islogin = false;
      this.Isregister = true;
      this.isSubmit = false;
    }
   
  }

}
