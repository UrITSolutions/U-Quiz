import { Component, OnInit } from '@angular/core';
import 'jquery';
import { $REST_URI } from '../constants/constants';

declare var $: any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  dtOptions: DataTables.Settings;
  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      lengthChange: false,
      ajax: {
        url: $REST_URI + '/result',
        dataSrc: function (json) {
          return json;
        },
        method: 'GET'
      },
      search: false,
      searching: false,
      columns: [
        { data: 'user.name' },
        {
          data: 'user.church', render: function (data, type, full) {
            switch(data) {
              case 1: return 'AYAPAKKAM';
              case 2: return 'MELPAKKAM';
              case 3: return 'THERUVERKADU';
              case 4: return 'MOONDRU NAGAR';
              case 5: return 'PARUTHIPATTU';
            }
          }
        },
        { data: 'time' },
        { data: 'result' }, //yearOfPublication
        {
          data: 'code', render: function (data, type, full) {
            return ''
          }
        }
      ]
    };
  }

}
