import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AboutusComponent} from "./aboutus.component";

const aboutusRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'aboutus',
        component: AboutusComponent
    }
]);

@NgModule({
    imports: [
        CommonModule,
        aboutusRouting
    ],
    declarations: [AboutusComponent]
})
export class AboutusModule {
}
