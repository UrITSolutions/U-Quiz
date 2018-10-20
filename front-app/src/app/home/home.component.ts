import { Component, OnInit } from '@angular/core';
import 'jquery';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/model/model.user';
import { $REST_URI } from '../constants/constants';
import { Response } from 'src/model/model.response';
import { Time } from '@angular/common';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  questions: [any];
  user: any;
  response: Response;
  startTime: any;
  endTime: any;

  constructor(private http: HttpClient, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);

  }

  submit(param) {
    this.endTime = new Date();
    var diff = this.endTime - this.startTime ;
    let timeTaken = this.millisToMinutesAndSeconds(diff);
    this.http.post($REST_URI + '/questions', { answers: param, timeTaken: timeTaken, user: this.user._id }).subscribe((res: any) => {
      console.log(res);
      this.router.navigateByUrl('/thankYou');

    }, (err) => { console.log(err) })
  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds: any = ((millis % 60000) / 1000).toFixed(0);
    var milli: any = millis/1000;
    milli = milli.toString().split('.')[1];
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ':' + milli;
  }

  ngOnInit() {
    this.http.get($REST_URI + '/questions').subscribe((res: any) => {
      this.questions = res.data;
    }, (err) => {
      console.log(err);
    });

    $(document).ready(()=>{
      $('body').addClass('hide-body');

      $('#start-btn').click(()=>{
        $('#start-card').fadeOut();
        setTimeout(()=>{
          $('#overlay').fadeOut();
          $('body').removeClass('hide-body');
          this.startTime = new Date();
        },700)
      });
    });
  }
}
