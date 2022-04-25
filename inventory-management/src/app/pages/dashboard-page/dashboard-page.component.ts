import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { getDateString } from 'src/app/services';
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
  search = '';
  config: any;
  total = inventoryData.length;
  valueSortName = 0;
  valueSortDate = 0;
  initialSuggestion: string[] = [];
  suggestion: string[] = [];
  // data: Data[] = Array.from(new Set(inventoryData));;
  data: Data[] = inventoryData
  result: object[] = [{
    "name_product": "",
    "amount": 0,
    "createBy": "",
    "createAt": "",
  }];
  myControl = new FormControl();

  constructor() {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.total,
    };
  }

  ngOnInit(): void {
    console.log(Math.floor(Date.now() / 1000));
    inventoryData.forEach(element => {
      this.initialSuggestion.push(element.name_product);
    })
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  onSearch = (search: string) => {
    if (search !== "") {
      this.suggestion = this.initialSuggestion.filter((option) => option.toLowerCase().includes(search.toLowerCase()));
      return;
    }

    this.suggestion = [];
    this.data = inventoryData;
  }

  convertTimestampsToString = (value: number) => {
    return getDateString(value);
  };

  onKeyPress = (key: any, search: string) => {
    if (key.keyCode === 13) {
      this.data = [];
      this.result = [];
      inventoryData.forEach((element) => {
        if (
          element['name_product'].toLowerCase().includes(search.toLowerCase())
        ) {
          this.data.push(element);

          this.result.push({
            name_product: element.name_product,
            amount: element.amount,
            createBy: element.createBy,
            createAt: getDateString(element.createAt),
          });
        }
      })
    }
  };

  onExport = () => {
    var options = {
      fieldSeparator: ';',
      quoteStrings: ' ',
      showLabels: true,
      showTitle: true,
      noDownload: false,
      headers: ['Tên sản phẩm', 'Số lượng', 'Người tạo', 'Thời gian tạo'],
    };

    return new AngularCsv(this.result, 'Data File', options);
  };

  onNameSort = () => {
    switch (this.valueSortName) {
      case 0:
        this.data = this.data.sort((a, b) => (a.name_product < b.name_product) ? -1 : 1);
        this.valueSortName++;
        // console.log(inventoryData);
        break;
      case 1:
        this.data = this.data.sort((a, b) => (a.name_product > b.name_product) ? -1 : 1);
        this.valueSortName++;
        break;
      case 2:
        // this.data = inventoryData;
        this.data = this.data.sort((a, b) => (a.createAt > b.createAt) ? -1 : 1);
        this.valueSortName = 0;
        break;
    }
  }

  onDateSort = () => {
    switch (this.valueSortDate) {
      case 0:
        this.data = this.data.sort((a, b) => (a.createAt < b.createAt) ? -1 : 1);
        this.valueSortDate++;
        break;
      case 1:
        this.data = this.data.sort((a, b) => (a.createAt > b.createAt) ? -1 : 1);
        this.valueSortDate = 0;
        break;
    }
  }

  onRowClick = (id: number) => {
    // console.log(id);
    // // console.table(this.data.find((element) => element.id === id));
    // return this.data.find((element) => element.id === id);
    // this.router.navigate(['/detail-page', id]);
  };
}
