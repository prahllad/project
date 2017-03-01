import { Component, OnInit } from '@angular/core';
import {ProfileService} from './profile.service';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../shared/models/user';
import { Input } from '@angular/core';
import {UserService} from '../shared/services/user.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
	profileForm : FormGroup;
  details: User=<User>{};
  newDate: Date;
  dt:any;
  year: any;
  month: any;
  date: any;
  tmp: any;
  constructor(private prf:ProfileService, 
  private router:Router,
  private fb: FormBuilder, 
  private userService: UserService) {}

  ngOnInit() {
    this.userService.populate();
    this.prf.getDetails().subscribe(data=>{
    this.details=data;
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
    this.profileForm = this.fb.group({
	  'name' : [this.details.name, Validators.required],
	  'email' : [this.details.email, Validators.required],
    'pursuing' : [this.details.pursuing_status],
    'high_qual' : [this.details.high_qual, Validators.required],
    'dob' : [this.details.dob, Validators.required],
    'phonenumber' : [this.details.phonenumber, Validators.required],
    'high_qual_perc' : [this.details.high_qual_perc, Validators.required],
    'gender': [this.details.gender, Validators.required],
    'street' : [this.details.street, Validators.required],
    'city' : [this.details.city, Validators.required],
    'state' : [this.details.state, Validators.required],
    'pincode' : [this.details.pincode, Validators.required],
		});
    });
  }
  load()
  {
	  this.details = this.profileForm.value;
    this.prf.postDetails(this.details).
      subscribe(data=>{
        this.details=data;
      });
  	this.router.navigate(['profile']);
  }
}
