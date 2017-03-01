import {Component,OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../shared/models/user";
import {ApiService} from "../../shared/services/api.service";
import {URLSearchParams} from "@angular/http";

@Component({
      templateUrl:'./profileview.html'
})
export class ProfileView implements OnInit
{
    applicantEmail: string;
    tmp: string="Welcome";
    details: User;
    constructor(private rout:ActivatedRoute,
                private apiService:ApiService){}
    ngOnInit()
    {
        console.log(this.rout.snapshot.params['id']);
        
        this.applicantEmail=this.rout.snapshot.params['id'];
        this.apiService.get('/userinfo', new URLSearchParams('email='+this.applicantEmail))
        .subscribe(data=>{
            console.log(data);
            this.details=data.user;
        });
    }
}