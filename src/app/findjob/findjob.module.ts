import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FindjobComponent} from "./findjob.component";
import {FormsModule} from "@angular/forms";

const findjobRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'findjob',
        component: FindjobComponent
    }
]);

@NgModule({
    imports: [
        CommonModule,
        findjobRouting,
        FormsModule
    ],
    declarations: [FindjobComponent]
})
export class FindjobModule {
}