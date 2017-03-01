import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {UserService} from "../shared/services/user.service";
import {Router} from "@angular/router";
import {User} from "../shared/models/user";
import {ProfileService} from "../profile/profile.service";
import {CustomValidators} from "ng2-validation";
import {PasswordService} from "./password.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  isHr: boolean;
  email: string;
  passwordChangeForm: FormGroup;
  error: string;
  isSubmitting: boolean = false;
  details: any;
  newPass: string;
  passMatcher: PassHelper=<PassHelper>{};
  constructor(fb: FormBuilder, 
              private userService: UserService, 
              private router: Router, 
              private profile: ProfileService,
              private passwordService: PasswordService) {
      let password = new FormControl('', Validators.compose([Validators.required,
            Validators.minLength(6)]));
        let confirmPassword = new FormControl('', CustomValidators.equalTo(password));
      
      this.passwordChangeForm = fb.group({
            'oldPassword': [null, Validators.required],
            'newPassword': password,
            'confirmPassword': confirmPassword
      });
  }

  ngOnInit() {
     this.userService.populate();
      this.profile.getDetails().subscribe(data => {
          this.isHr=data.isHr;
          this.details=data;
    });
    this.isSubmitting=false;
  }

  passChange(){
      this.isSubmitting=true;
      this.newPass=this.passwordChangeForm.value.newPassword;
      this.error=null;
      this.passMatcher.isHr=this.details.isHr;
      this.passMatcher.oldPass=this.passwordChangeForm.value.oldPassword;
      this.passMatcher.newPass=this.passwordChangeForm.value.newPassword;
      this.passwordService.matchPass(this.passMatcher)
      .subscribe(obj => {
        if(!obj.status){
          this.error=obj.msg;
          this.isSubmitting=false;
        }
        else{
           this.details=obj.user;
           this.isSubmitting=false;
           this.passwordChangeForm.reset();
           this.error="Password changed successfully."
        }
        });
  }

}

export class PassHelper {
  isHr: boolean;
  oldPass: string;
  newPass: string;
}
