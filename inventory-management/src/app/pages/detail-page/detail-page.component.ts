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
  // datas: object[] = [];
  datas: any;
  id: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.params.subscribe((params) => {
    //   this.datas = params;
    // });
    this.id = this.route.snapshot.params;
    // console.table(dataa);
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

  onFilter = (search: number) => {
    console.log(
      this.datas.filter(
        () => {
          // if (item.id === +this.route.snapshot.params) {
          //   this.datas.push(item);
          //   console.log(item);
          // }
        }
        // option.name_product.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  convertTimestampsToString = (value: number) => {
    return getDateString(value);
  };
}
