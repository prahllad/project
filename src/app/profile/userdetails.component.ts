import {Component, OnInit} from "@angular/core";
import {ProfileService} from "./profile.service";
import {User} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-userdetails',
  templateUrl:'./userdetails.component.html'
})
export class UserdetailsComponent implements OnInit {

    constructor(
      private profile: ProfileService, 
      private userService: UserService
      ) {
    }
     date: any;
    details: User;
    newDate: Date;
    year: any;
    month: any;
    dt: any;
    tmp: any;



  ngOnInit() {
    this.userService.populate();
    this.profile.getDetails().subscribe(data => {
    this.details = data;
    this.date=new Date(this.details.dob);
    this.year=this.date.getFullYear();
    this.month=this.date.getMonth()+1;
    this.dt=this.date.getDate();
    if (this.dt < 10) {
        this.dt = '0' + this.dt;
    }
    if (this.month < 10) {
        this.month = '0' + this.month;
    }
    this.details.dob=this.tmp=this.year+'-'+this.month+'-'+this.dt;
    });



  }
}
