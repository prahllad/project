import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
@Component({
  selector: 'app-hrportal',
  templateUrl: './hrportal.component.html'
})
export class HrportalComponent implements OnInit {
email:string;
  constructor(private router :Router) { }

  ngOnInit() {
    
    if(!localStorage.getItem('hremail'))
    {
         this.router.navigateByUrl('/login');
         
    }

this.email=localStorage.getItem('hremail');

  }

}
