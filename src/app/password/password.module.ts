import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import {SharedModule} from "../shared/shared.module";
import {PasswordService} from "./password.service";


const PASS_ROUTES:Routes=[
    {
      path:'forgotpass',
      component:ForgotPasswordComponent
    },
    {
      path:'changepass',
      component:ChangePasswordComponent
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(PASS_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ChangePasswordComponent, ForgotPasswordComponent],
  providers: [PasswordService]
})
export class PasswordModule { }
