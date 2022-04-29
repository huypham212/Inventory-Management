import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DeleteModalComponent } from 'src/app/components/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/components/update-modal/update-modal.component';
import { getDateString } from 'src/app/services';
import { getProductById } from 'src/app/services';

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
  constructor(private route: ActivatedRoute, private http: HttpClient, private matDialog: MatDialog) { }

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

  changeFormatDate = (value: string) => {
    let newDate = new Date(value);
    // console.log(newDate.toLocaleString());
    return getDateString(newDate.toLocaleString());
    // return value
  };

  onUpdate = () => {
    console.log(this.route.snapshot.params['id'])
    // console.log(id);
    // this.dataTmp = this.data.filter((element) => element.id === id)
    // console.log(this.dataTmp)
    this.matDialog.open(UpdateModalComponent, {
      data: {
        productId: this.route.snapshot.params['id'],
        isFromDetail: true
      }
    });
  };

  onDelete = () => {
    this.matDialog.open(DeleteModalComponent, {
      data: {
        id: this.route.snapshot.params['id'],
        isFromDetail: true
      },
    });
  };
}
