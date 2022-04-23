import { Component, Input, OnInit } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import data from '../../data/data.json';
import { getDateString } from 'src/app/services';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  search = "";
  suggestion: string[] = [];
  result: object[] = [{
    "name_product": "",
    "amount": 0,
    "createBy": "",
    "createAt": "",

  }];
  constructor() {
  }

  ngOnInit(): void {
    this.result = data;

    data.forEach(element => {
      this.suggestion.push(element.name_product);
      // console.table(formatDate(new Date(element.createAt * 1000).toUTCString(), "dd/MM/yyyy hh:mm:ss a", "en-US", "GMT+07:00"));
    })


  }


  onSearch = (search: string) => {
    console.log(this.suggestion.filter((option) => option.toLowerCase().includes(search.toLowerCase())));
  }

  onKeyPress = (key: any, search: string) => {
    this.result = [];
    if (key.keyCode === 13) {
      data.forEach(element => {
        if (element['name_product'].toLowerCase().includes(search.toLowerCase())) {
          this.result.push({
            "name_product": element.name_product,
            "amount": element.amount,
            "createBy": element.createBy,
            "createAt": getDateString(element.createAt)
          });
        }
      })

      console.log(this.result);
    }
  }

  onNameSort = () => {
    return;
  }

  onDateSort = () => {
    return;
  }

  onExport = () => {
    var options = {
      fieldSeparator: ';',
      quoteStrings: " ",
      showLabels: true,
      showTitle: true,
      noDownload: false,
      headers: ["Tên sản phẩm", "Số lượng", "Người tạo", "Thời gian tạo"],
    };

    console.log(new AngularCsv(this.result, "Data File", options));
  }
}
