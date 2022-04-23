import { Component, Input, OnInit } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { getDateString } from 'src/app/services';
import { formatDate } from '@angular/common';
import inventoryData from '../../data/data.json';

interface Data {
  id: number;
  name_product: string;
  amount: number;
  createBy: string;
  createAt: number;
  updateBy: string;
  updateAt: string;
  brand: string;
  type: string;
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  search = "";
  suggestion: string[] = [];
  data: Data[] = inventoryData;
  result: object[] = [{
    "name_product": "",
    "amount": 0,
    "createBy": "",
    "createAt": 0,

  }];

  constructor() {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.total,
    };
  }

  ngOnInit(): void {


    inventoryData.forEach(element => {
      this.suggestion.push(element.name_product);
      //console.table(this.suggestion.sort());
    })
  }

  config: any;
  total = inventoryData.length;

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  onSearch = (search: string) => {
    console.log(this.suggestion.filter((option) => option.toLowerCase().includes(search.toLowerCase())));
  }

  onKeyPress = (key: any, search: string) => {
    this.data = [];
    this.result = [];
    if (key.keyCode === 13) {
      inventoryData.forEach(element => {
        if (element['name_product'].toLowerCase().includes(search.toLowerCase())) {
          this.data.push(element);

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