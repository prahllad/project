import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from "./profile.component";
import { RouterModule, Routes } from '@angular/router';
import { UserdetailsComponent } from './userdetails.component';
import {EditComponent} from './edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfileService} from './profile.service';
import {UserService} from '../shared/services/user.service';
import { DatePipe } from '@angular/common';
import { UserjobsComponent } from './userjobs.component';
import { ScriptService } from '../shared/services/script.service';
import { VerifyComponent } from './verify.component';



const APP_ROUTES:Routes=[
    {path:'profile',component:ProfileComponent,
    children:[
        {
            path:'',
            component:UserdetailsComponent
        },
        {
            path:'edit',
            component:EditComponent
        }
    ]
    },
    {
        path:'verifyemail',
        component:VerifyComponent   
    }
];

@NgModule({
    imports: [
        CommonModule,
         RouterModule.forRoot(APP_ROUTES),
         FormsModule,
         ReactiveFormsModule
    ],
    declarations: [ProfileComponent, UserdetailsComponent,EditComponent, UserjobsComponent, VerifyComponent],
    providers:[ProfileService, UserService, DatePipe, ScriptService]
})
export class ProfileModule {
}
