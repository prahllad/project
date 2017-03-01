import {Component, OnInit} from "@angular/core";
import {Job} from "../shared/models/job";
import {JobListingService} from "../shared/services/jobListing.service";
import {URLSearchParams} from "@angular/http";
import {ApiService} from "../shared/services/api.service";
import {Router} from "@angular/router";

//import {jobsList} from '.\app\findjob\jobs';
@Component({
  selector: 'app-findjob',
    moduleId: module.id,
    templateUrl: 'findjob.component.html',
    styleUrls: ['findjob.component.css'],
    providers: [JobListingService]
  
})
export class FindjobComponent implements OnInit {
    job: Job[] = [];
    jobid:string="job1";
    listFilter: string;
    public visible = false;
    private visibleAnimate = false;
    selectedJob: Job;
    appliedJobs: AppliedJob[]=[];
    appJob:String[]=[];
    hidden:boolean=false;

    constructor(private jobList: JobListingService, private apiService: ApiService, private route: Router) {
    }


  ngOnInit() {
      this.jobList.getAll()
          .subscribe(jobs => {
              this.job = jobs;
          });
    if(localStorage.getItem("email")){
        this.apiService.get('/applied', new URLSearchParams('email='+localStorage.getItem('email')))
        .subscribe(data=>{
            this.appliedJobs=data.jobs;
            this.appliedJobs.forEach(element => {
            this.appJob.push(element.job_id);
        });
        });
    }        
  }
    apply(job: Job) {
        if(!localStorage.getItem("email"))
 {
     alert("Login before Apply");
   this.route.navigateByUrl('/login');
 }
 if(!!localStorage.getItem("email"))
 {
     this.jobList.applyJob(job);
 }
        
    }


    public show(job: Job): void {
        this.selectedJob = job;
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true,300);
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }


}

export class AppliedJob{
  _id:string;
  job_id:string;
}
