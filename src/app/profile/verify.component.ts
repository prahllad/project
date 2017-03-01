import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, Params} from "@angular/router";
import {JwtService} from "../shared/services/jwt.service";
import {UserService} from "../shared/services/user.service";
import {ApiService} from "../shared/services/api.service";
import { Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
})
export class VerifyComponent implements OnInit {

  token: string;
  email: string;
  fromRegister : boolean;
  fromLink : boolean;

  constructor(private route: Router,
              private userService: UserService,
              private ActRouter : ActivatedRoute,
              private jwtService: JwtService,
              private apiService: ApiService) { }

  ngOnInit() {

    this.ActRouter.queryParams.subscribe((params: Params)=>{
      if(!params['token'] && params['email']){
          this.fromRegister=true;
          this.fromLink=false;
      }
    else if(params['token'] && params['email']){
      this.fromLink=true;
      this.fromRegister=false;
      this.token=params['token'];
      this.email=params['email'];
      console.log(this.email);
      console.log(this.token);
      this.verifyAccount()
      .subscribe(data=>{
        console.log(data);
        this.userService.purgeAuth();
          this.userService.login(data)
          .subscribe(data=>{
            this.userService.populate();
            this.route.navigateByUrl('/profile/edit');
          })
      })
      //this.route.navigateByUrl('profile');
    }
  });

}

verifyAccount(){
      console.log("Inside verify method>>>>>>>>>>>>>>>>>>>>>>>>>>");
      this.jwtService.saveToken(this.token);
      localStorage.setItem('email', this.email);
      return this.apiService.post('/verified')
      .map(data=>{
        console.log(data);
        return data.data;
      })
}

}
