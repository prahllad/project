import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {AuthGuard} from "./auth.guard";
import {PasswordModule} from "../password/password.module";
import { ExternAuthComponent } from './extern-auth.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'login',
        component: LoginComponent,
        canActivate : [AuthGuard]
    }, {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'externauth',
        component: ExternAuthComponent
    }
]);

@NgModule({
    imports: [
        CommonModule,
        authRouting,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        PasswordModule
    ],
    providers : [AuthGuard],
    declarations: [LoginComponent, RegisterComponent, ExternAuthComponent],
    
})
export class AuthModule {
}
