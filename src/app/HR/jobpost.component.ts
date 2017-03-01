import { FindjobModule } from '../findjob/findjob.module';
import {Component,OnInit} from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators,NgForm} from "@angular/forms";
import {Job} from '../shared/models/job';

import {ApiService} from "../shared/services/api.service";
import {Router} from '@angular/router';
@Component({

        selector:'app-jobpost',
        templateUrl:'./jobpost.html'
    }
)
export class JobComponent implements OnInit  {
 email:string;
 val:boolean=false;
 obj:any;
 constructor(private postjob:ApiService,private router:Router){}
 job = new Job();
ngOnInit()
{
  if(!localStorage.getItem('hremail'))
  {
    this.router.navigate(['../../login']);
    return(1);
  }
  
 this.job.postedBy=localStorage.getItem('hremail');
}
  onSubmit()
  {
    if(!localStorage.getItem('hremail'))
    {
      alert('you are not logged in! please log in to post a job');
      window.close();
    }
    
    this.postjob.post("/jobadd",this.job).subscribe(data=>{
        this.val= true},
      err=>{
        alert('remote server error');
      }  
      );
    

       
   
  }



}