import { Component, Input, OnInit } from '@angular/core';
import data from '../../data/data.json';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  search = "";
  suggestion: string[] = [];
  result: object[] = [];

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
          this.result.push(element);
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
    console.log("Export!");
  }
}
