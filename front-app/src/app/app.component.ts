import { Component, OnInit } from '@angular/core';
import 'jquery';
import { User } from 'src/model/model.user';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: any;
  constructor(private router: Router) {
    this.user = new User();
    try {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    } catch (error) {
      this.user = new User();
    }
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false, coverTrigger: false });
      $(".dropdown-trigger-side-nav").dropdown();
    });
  }

}