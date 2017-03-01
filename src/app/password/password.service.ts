import {Injectable} from "@angular/core";
import {PassHelper} from "./change-password.component";
import {ApiService} from "../shared/services/api.service";
@Injectable()
export class PasswordService {

    constructor(private apiService: ApiService){}

    matchPass(obj: PassHelper){
        return this.apiService.post('/matchpass', obj)
        .map(data => {
            console.log(data);
            return data;
        });
    }
    
    forgotPass(obj: any){
        console.log(obj);
        return this.apiService.post('/forgotPass',obj)
        .map(data=>{
            console.log(data);
            return data;
        },err=>{
            console.log(err);
            return err;
        });
    }

    resetPassword(obj:any){
        console.log(obj);
        if(obj.isHr=="true")
        {
        return this.apiService.post('/areset',obj)
                        .map(res=>{
                            return res;
                        },err=>{
                            return err;
                        });
        }
        else if(obj.isHr=="false"){
            return this.apiService.post('/reset',obj)
                        .map(res=>{
                            return res;
                        },err=>{
                            return err;
                        });
        }
    }
}
