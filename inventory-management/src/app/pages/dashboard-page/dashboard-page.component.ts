import { Component, Input, OnInit } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import data from '../../data/data.json';

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
    "createAt": 0,

  }];

  constructor() {
  }

  ngOnInit(): void {
    data.forEach(element => {
      this.suggestion.push(element.name_product);
      //console.table(this.suggestion.sort());
    })
  }


  onSearch = (search: string) => {
    console.log(this.suggestion.filter((option) => option.toLowerCase().includes(search.toLowerCase())));
  }

  onKeyPress = (key: any, search: string) => {
    this.result = [];
    if (key.keyCode === 13) {
      data.forEach(element => {
        if (element['name_product'].includes(search)) {
          this.result.push({
            "name_product": element.name_product,
            "amount": element.amount,
            "createBy": element.createBy,
            "createAt": element.createAt
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
