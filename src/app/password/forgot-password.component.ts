import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, Params} from "@angular/router";
import {JwtService} from "../shared/services/jwt.service";
import { Subscription } from 'rxjs/Rx';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {CustomValidators} from "ng2-validation";
import {PasswordService} from "./password.service";
import {UserService} from "../shared/services/user.service";



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  token: string;
  email: string;
  isHr: boolean;
  resetForm: FormGroup;
  error: string;
  isSubmitting: boolean = false;
  details: any;
  newPass: string;

  constructor(fb: FormBuilder,
              private route: Router,
              private ActRouter : ActivatedRoute,
              private jwtService: JwtService,
              private userService : UserService,
              private passwordService: PasswordService) {
              let password = new FormControl('', Validators.compose([Validators.required,
                  Validators.minLength(6)]));
              let confirmPassword = new FormControl('', CustomValidators.equalTo(password));
              this.resetForm = fb.group({
                'newPassword': password,
                'confirmPassword': confirmPassword
              });
                }

  ngOnInit() {
    this.isSubmitting=false;
    this.ActRouter.queryParams.subscribe((params: Params)=>{
      this.token=params['token'];
      this.email=params['email'];
      this.isHr=params['H'];
      console.log(this.email);
      console.log(this.token);
      console.log(this.isHr);
      localStorage.setItem('email', this.email);
      console.log("Email Saved");
      //localStorage.setItem('token', this.token);
      this.jwtService.saveToken(this.token);
      console.log("Token saved");
    });
  }

  onReset(){
    this.isSubmitting=true;
    console.log(this.resetForm.value.newPassword);
    console.log(this.isHr);
    console.log(localStorage.getItem('email'));
    let obj={
      password:this.resetForm.value.newPassword,
      isHr:this.isHr,
      email: this.email
    }
    this.passwordService.resetPassword(obj)
                        .subscribe(data=>{
                          console.log(data);
                          this.userService.purgeAuth();
                          if(data.status){
                            alert(data.data);
                            this.route.navigateByUrl('/login');
                          }
                        },err=>{
                            console.log(err);
                            this.userService.purgeAuth();
                            if(err.status){
                            alert(err.err);
                            this.route.navigateByUrl('/login');
                          }
                        });
  }

}
