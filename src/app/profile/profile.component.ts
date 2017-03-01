import {Component, OnInit, ViewChild} from "@angular/core";
import {ProfileService} from "./profile.service";
import {Router,ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user";
import {ScriptService} from '../shared/services/script.service';
import {URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';
declare var filepicker: any;
declare var $;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
var : any;
token: string;
email: string;

filePickerKey: any = 'Ap8ETk3FYQOlT98dMyXpNz';
public visible = false;
    private visibleAnimate = false;
  constructor( private route: Router,
              private userService: UserService, 
              private profile: ProfileService, 
              private scriptService: ScriptService,
              private ActRouter : ActivatedRoute,){

  }

details: User;
@ViewChild('image')
image;
ngOnInit(){

 
 /**if(!localStorage.getItem("email"))
 {
   this.route.navigateByUrl('/login');
 }*/

 this.scriptService.load('filepicker')
        .then((data) => {
          this.scriptService.load('link')
            .then((data) => {
              console.log('Scripts Loaded', data);
            })
            .catch((error) => {
              //any error
            });
        })
        .catch((error) => {
          //any error
        });

 this.userService.populate();
    this.profile.getDetails().subscribe(data => {
    this.details = data;
    if(this.details.picture==null){
      this.image.nativeElement.src="/assets/images/avatar3.png";
    }
    });
}
   
upload() {
    filepicker.setKey(this.filePickerKey);
    var options = { mimetypes: ['image/*'],
    container: 'modal',
    services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX', 'CONVERT'],
    conversions: ['crop', 'rotate', 'filter'],
    cropRatio: 1,
    cropForce: true };
    filepicker.pick(
      options,
      (InkBlob: any) => {
        console.log(InkBlob);
        this.details.picture=InkBlob.url;
        this.profile.postDetails(this.details).
          subscribe(data=>{
          this.details = data;
          console.log('world',this.image);
         this.image.nativeElement.src=data.picture;
    });

   // this.ngOnInit();
      },
      (FPError: any) => {
        console.log(FPError.toString());
      }
    );
  }


    public show(){
        
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true);
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }

    uploadResume(){
      filepicker.setKey(this.filePickerKey);
    var options = { extension: '.pdf',
    container: 'modal',
    services: ['COMPUTER'] };
    filepicker.pick(
      options,
      (InkBlob: any) => {
        console.log(InkBlob);
        this.details.resume=InkBlob.url;
        this.profile.postDetails(this.details).
          subscribe(data=>{
          this.details = data;
          console.log(data);
    });

   // this.ngOnInit();
      },
      (FPError: any) => {
        console.log(FPError.toString());
      }
    );
    }

    downloadResume(){
      window.open(this.details.resume);
    }


}




