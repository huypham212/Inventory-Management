import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDateString } from 'src/app/services';
import dataa from '../../data/data.json';
@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  datas: any;
  id: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params;
    dataa.filter((item) => {
      if (item.id === +this.route.snapshot.params['id']) {
        this.datas = item;
        console.log(item);
      }
    });
    console.log(this.id);
    console.log(this.route.snapshot.params['id']);

    console.log(this.datas);
  }

  onFilter = (search: number) => { };

  convertTimestampsToString = (value: number) => {
    return getDateString(value);
  };
}
