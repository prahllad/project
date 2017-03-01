import {BrowserModule} from "@angular/platform-browser";
import {NgModule, ModuleWithProviders} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./shared/layouts/header.component";
import {RouterModule} from "@angular/router";
import {FindjobModule} from "./findjob/findjob.module";
import {ProfileModule} from "./profile/profile.module";
import {AboutusModule} from "./aboutus/aboutus.module";
import {AuthModule} from "./auth/auth.module";
import {SharedModule} from "./shared/shared.module";
import {JwtService} from "./shared/services/jwt.service";
import {UserService} from "./shared/services/user.service";
import {ApiService} from "./shared/services/api.service";
import {JobListingService} from "./shared/services/jobListing.service";
import {HrModule} from "./hr/hr.module";
import {PasswordModule} from "./password/password.module";
import {PasswordService} from "./password/password.service";
import {CookieService} from "./shared/services/cookie.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([
    {
        path: '', redirectTo: "findjob", pathMatch: 'full'
    }, {
        path: '**', redirectTo: '/findjob', pathMatch: 'full'
    }
]);

@NgModule({
    declarations: [
        AppComponent, HeaderComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        FindjobModule,
        AboutusModule,
        ProfileModule,
        AuthModule,
        SharedModule,
        rootRouting,
        ReactiveFormsModule,
        HrModule,
        PasswordModule,
        NgbModule.forRoot()
    ],
    bootstrap: [AppComponent],
    providers: [UserService,
        ApiService,
        JobListingService,
        JwtService,
        PasswordService,
        CookieService
    ]
})
export class AppModule {
}
