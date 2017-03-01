import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ErrorComponent} from "./error/error.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        NgbModule
    ],
    declarations: [ErrorComponent],
    exports: [ErrorComponent]

})
export class SharedModule {
}
