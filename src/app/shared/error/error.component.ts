import {Component, Input} from "@angular/core";

@Component({
    selector: 'error-list',
    templateUrl: './error.component.html'
})
export class ErrorComponent {

    @Input()
    error: string;

}
