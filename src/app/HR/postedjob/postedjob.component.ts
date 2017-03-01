import {Component, OnInit} from "@angular/core";
import {ApiService} from "../../shared/services/api.service";
import {URLSearchParams} from "@angular/http";
import {Job} from "../../shared/models/job";
@Component({
  selector: 'app-postedjob',
    templateUrl: 'postedjob.component.html'
})
export class PostedjobComponent implements OnInit {
email:string;
postedjob:Job[];
applicants:Applicant[];
public visible:boolean=false;
private visibleAnimate = false;

  constructor(private getjob:ApiService) { }

  ngOnInit() {
if(!localStorage.getItem("hremail"))
  {  return 1;}

this.getjob.get("/postedJobs",new URLSearchParams('email='+localStorage.getItem('hremail')))
.subscribe(
 data=>{
    this.postedjob=data.docs
   },
 err=>{
   alert('having problem');
 });
}

viewapply(jobid: String){
  
    this.getjob.get("/applicants",new  URLSearchParams('job_id='+jobid))
    .subscribe(data=>
    {
      this.applicants=data.jobs;
      console.log(this.applicants);
      this.show();
    });
  }

   public show(): void {
        
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true);
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }
}

export class Applicant{
  _id:string;
  email:string;
}