import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { getDateString } from 'src/app/services';
import inventoryData from '../../data/data.json';
import { UpdateModalComponent } from './../../components/update-modal/update-modal.component';
import { DeleteModalComponent } from './../../components/delete-modal/delete-modal.component';
import { ModalAddComponent } from './../../components/modal-add/modal-add.component';
import { Router, ActivatedRoute } from '@angular/router';

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

interface defineDataCsv {
  name_product: string;
  amount: number;
  createBy: string;
  createAt: string;
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  search = '';
  messageExport = '';
  token = '';
  config: any;
  total = inventoryData.length;
  valueSortName = 0;
  valueSortDate = 0;
  initialSuggestion: string[] = [];
  suggestion: string[] = [];
  data: Data[] = inventoryData;
  dataTmp: Data[] = [];
  result: defineDataCsv[] = [];


  constructor(private matDialog: MatDialog, private route: ActivatedRoute, private router: Router) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.total,
    };
  }

  ngOnInit(): void {
    // console.log(Math.floor(Date.now() / 1000));
    this.token = this.route.snapshot.params.toString();
    this.messageExport = '';
    inventoryData.forEach((element) => {
      this.initialSuggestion.push(element.name_product);

      this.result.push({
        name_product: element.name_product,
        amount: element.amount,
        createBy: element.createBy,
        createAt: getDateString(element.createAt),
      });
    });
    console.log(this.token)
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  onSearch = (search: string) => {
    if (search !== '') {
      this.suggestion = this.initialSuggestion.filter((option) =>
        option.toLowerCase().includes(search.trim().toLowerCase())
      );
      return;
    }

    this.valueSortDate = 1;
    this.data = inventoryData;
    this.data = this.onDateSort();
    this.suggestion = [];
    this.config.totalItems = this.data.length;
    this.config.currentPage = 1;
  };

  convertTimestampsToString = (value: number) => {
    return getDateString(value);
  };

  onKeyPress = (key: any, search: string) => {
    if (key.keyCode === 13) {
      this.data = [];
      this.result = [];
      inventoryData.forEach((element) => {
        if (
          element['name_product']
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        ) {
          this.data.push(element);
        }
        this.config.totalItems = this.data.length;
      });
    }
  };

  onExport = () => {
    var options = {
      title: '',
      fieldSeparator: ';',
      showLabels: true,
      showTitle: true,
      noDownload: false,
      headers: ['Tên sản phẩm', 'Số lượng', 'Người tạo', 'Thời gian tạo'],
    };

    this.result = [];
    this.data.forEach((element) => {
      this.result.push({
        name_product: element.name_product,
        amount: element.amount,
        createBy: element.createBy,
        createAt: getDateString(element.createAt),
      });
    });
    new AngularCsv(this.result, 'Data File', options);
    return (this.messageExport = 'Xuất thành công');
  };

  onNameSort = () => {
    switch (this.valueSortName) {
      case 0:
        this.data = this.data.sort((a, b) =>
          a.name_product < b.name_product ? -1 : 1
        );
        this.valueSortName++;
        break;
      case 1:
        this.data = this.data.sort((a, b) =>
          a.name_product > b.name_product ? -1 : 1
        );
        this.valueSortName++;
        break;
      case 2:
        this.data = this.data.sort((a, b) =>
          a.createAt > b.createAt ? -1 : 1
        );
        this.valueSortName = 0;
        break;
    }
  };

  onDateSort = () => {
    switch (this.valueSortDate) {
      case 0:
        this.data = this.data.sort((a, b) =>
          a.createAt < b.createAt ? -1 : 1
        );
        this.valueSortDate++;
        break;
      case 1:
        this.data = this.data.sort((a, b) =>
          a.createAt > b.createAt ? -1 : 1
        );
        this.valueSortDate = 0;
        break;
    }

    return this.data;
  };

  onRowClick = (id: number) => {
    this.router.navigate(['/detail-page', id]);
  };

  onAdd = () => {
    this.matDialog.open(ModalAddComponent);
  };

  onUpdate = (id: number) => {
    console.log(id);
    this.dataTmp = this.data.filter((element) => element.id === id);
    console.log(this.dataTmp);
    this.matDialog.open(UpdateModalComponent, { data: this.dataTmp });
  };

  onDelete = () => {
    this.matDialog.open(DeleteModalComponent);
  };
}
