import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {ApiService} from "./api.service";
import {Job} from "../models/job";
import {ProfileService} from "../../profile/profile.service";
import {User} from "../models/user";

@Injectable()
export class JobListingService {
    constructor(private apiService: ApiService, private profileService: ProfileService) {
    }
user:User;
    getAll() {
        return this.apiService.get('/joblisting')
            .map(data => {
                return data.jobs;
            });
    }

    applyJob(job :Job) {
        this.profileService.getDetails().subscribe(data => {
          this.user = data;
      });
      let data ={
          "email":this.user.email,
          "job_id":job.job_id,
          "resume":this.user.resume
      };
         this.apiService.post('/apply',data)
        .subscribe(res =>{
             alert("Applied Successfully");
        },
        err=>{
            alert("Already applied");
        });
    }
}
