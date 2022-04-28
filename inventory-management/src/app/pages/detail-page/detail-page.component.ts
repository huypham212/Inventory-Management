import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDateString } from 'src/app/services';
import { getProductById } from 'src/app/services';
import dataa from '../../data/data.json';

interface Data {
  name: string;
  quantity: number;
  userCreate: string;
  createDate: number;
  userUpdate: string;
  updateDate: string;
  brandId: string;
  categoryId: string;
}

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  datas: any;
  id: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.http
      .get(getProductById + this.route.snapshot.params['id'], {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .subscribe((data) => {
        console.log(data);

        this.datas = data;
        console.log(this.datas);
      });
    // console.log();
    // this.id = this.route.snapshot.params;
    // dataa.filter((item) => {
    //   if (item.id === +this.route.snapshot.params['id']) {
    //     this.datas = item;
    //     console.log(item);
    //   }
    // });
    console.log(this.route.snapshot.params['id']);
    // console.log(this.datas.name);

    // console.log(this.datas);
  }

  onFilter = (search: number) => { };

  convertTimestampsToString = (value: string) => {
    return getDateString(value);
  };
}
