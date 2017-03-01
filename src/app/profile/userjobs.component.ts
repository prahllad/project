import { Component, OnInit } from '@angular/core';
import {URLSearchParams} from "@angular/http";
import {ApiService} from "../shared/services/api.service";
import {JobListingService} from "../shared/services/jobListing.service";
import {Job} from "../shared/models/job";

@Component({
  selector: 'app-userjobs',
  templateUrl: './userjobs.component.html'
})
export class UserjobsComponent implements OnInit {
  
  appliedJobs: AppliedJob[]=[];
  appJob:Job[]=[];
  jobs: Job[] = [];
  job:Job[]=[];
  
  constructor(private apiService: ApiService, 
              private jobList: JobListingService) { }

  ngOnInit() {
    this.jobList.getAll()
          .subscribe(jobs => {
              this.jobs = jobs;
        this.apiService.get('/applied', new URLSearchParams('email='+localStorage.getItem('email')))
        .subscribe(data=>{
            this.appliedJobs=data.jobs;
            this.jobs.forEach(element => {
              this.appliedJobs.forEach(el=>{
                if(element.job_id==el.job_id)
                  this.job.push(element);
              });
            });
        });
      });
  }

}


export class AppliedJob{
  _id:string;
  job_id:string;
}
