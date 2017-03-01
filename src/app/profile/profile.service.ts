import {Injectable} from "@angular/core";
import {User} from "../shared/models/user";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {UserService} from "../shared/services/user.service";
import {ApiService} from "../shared/services/api.service";

@Injectable()
export class ProfileService {
    currentUser: User=<User>{};


    constructor(private userService: UserService, private apiService: ApiService) {
    }

getDetails()
{
    return this.userService.getCurrentUser();           
}

postDetails(user){
    console.log(user);
    return this.userService.update(user)
    .map(data=>{
    return data;
    });
} 

}
