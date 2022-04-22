import { Component, OnInit } from '@angular/core';
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
  config: any;
  total = inventoryData.length;
  constructor() {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.total,
    };
  }

  ngOnInit(): void {}

  data: Data[] = inventoryData;
  pageChanged(event: any) {
    this.config.currentPage = event;
  }
}
