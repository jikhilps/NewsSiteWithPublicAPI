import { Injectable } from '@angular/core';
import { AlertService } from 'src/app/Shared/alert-info/alert-service.service';




@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(public alertservice:AlertService) { }

  ValidateName(name, alt) {
    {
      {
        if (name.length > 0) {
          return (true)
        }
        else {
          if (alt) 
          { 
            
            this.alertservice.Alert('Please enter name!',2,()=>{},()=>{});
          }
        }
        return (false)
      }
    }
  }

  ValidatePassword(name, alt) {
    debugger;
    {
      {
        if (/^[a-zA-Z0-9_]*$/.test(name) && name.length<=20 && name.length>0) {
          return (true)
        }
        else {

          if (alt) 
          { 
            
            this.alertservice.Alert('Password: No special characters allowed & Max length is 20 characters long   ',2,()=>{},()=>{});
           }
        }
        return (false)
      }
    }
  }

  

  validatedate(date, alt) {
    {
      if (/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(date)) {
        return (true)
      }
      else { if (alt) { 
     
        this.alertservice.Alert("You have entered an invalid Date!",2,()=>{},()=>{});
      } }

      return (false)
    }
  }
  ValidateEmail(mail, alt) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    else {
      if (alt) {
       
    this.alertservice.Alert("You have entered an invalid email address!",2,()=>{},()=>{});
      }
    }
    return (false)
  }


  ValidateMobile(mobile, alt) {
    if (/^(\+[\d]{1,5}|0)?[6-9]\d{9}$/.test(mobile)) {
      return (true)
    }
    else {
      if (alt) {
        
        this.alertservice.Alert("You have entered an invalid mobile number!",2,()=>{},()=>{});
      }
      return (false)
    }
  }
  ValidateRate(name, alt) {
    {
      {
        if (name > 0) {
          return (true)
        }
        else { if(alt){
         
          this.alertservice.Alert("Enter Rate",2,()=>{},()=>{});
        }
        }
        return (false)
      }
    }
  }

  ValidateService(name, alt) {
    {
      {
        if (name.length > 0) {
          return (true)
        }
        else { if(alt){
       
        this.alertservice.Alert("Please Select Service",2,()=>{},()=>{});
        }
      }
        return (false)
      }
    }
  }


  
}

