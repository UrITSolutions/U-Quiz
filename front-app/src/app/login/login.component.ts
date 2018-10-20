import { Component, OnInit } from '@angular/core';
// import { write } from 'ts-xlsx';
import { User } from 'src/model/model.user';
import { HttpClient } from '@angular/common/http';
import { $REST_URI } from '../constants/constants';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User
  constructor(private http: HttpClient, private router: Router) {
    this.user = new User();
    try {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      if(this.user) {
        this.router.navigateByUrl('/home');
      }
    } catch (error) {
      this.user = new User();
    }
  }

  login() {
    console.log(this.user);
    $('#submit-btn').hide();
    $('.preloader-wrapper').addClass('active');
    this.http.post($REST_URI + '/user', this.user).subscribe((res: any) => {
      const user = res.data;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.error(err);
    });
  }

  ngOnInit() {
    $(document).ready(function () {
      $('select').formSelect();
      $(".select-dropdown").addClass('white-text');
      $(".caret").addClass('white-text');

    });
  }

}