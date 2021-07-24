import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/class/User';
import { ValidationService } from 'src/service/validation.service';
import { AlertService } from '../../Shared/alert-info/alert-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  user = new User();
  UsersList: any[] = [];
  Password: string = '';
  ConfirmPassword: string = '';
  constructor(private alertservice: AlertService, private validationservice: ValidationService, private modalcontroller: ModalController) { }

  ngOnInit() {

    this.GetUserData();
    this.GetUsersList();
  }
  GetUserData() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  GetUsersList() {
    if (localStorage.getItem('UsersList')) {
      this.UsersList = JSON.parse(localStorage.getItem('UsersList'));
    }
  }

  Back() {
    this.modalcontroller.dismiss();
  }


  Submit() {
    let that = this
    if (this.validationservice.ValidatePassword(this.Password, true)) {
      if (this.Password == this.ConfirmPassword) {
        this.UsersList.filter(d => d.Email == this.user.Email)[0].Password = this.Password;
        localStorage.setItem('UsersList', JSON.stringify(this.UsersList));
        localStorage.setItem('user', JSON.stringify(this.user));
        this.alertservice.Alert("Password changed successfully", 1, function () {
          that.modalcontroller.dismiss();
        }, function () {
          that.modalcontroller.dismiss();
        })
      } else {
        this.alertservice.Alert('Password is not matching', 2, function () { }, function () { })
      }
    }
  }


}
