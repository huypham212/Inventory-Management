import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { deleteProduct, putDelProduct } from 'src/app/services';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  id: number;
  constructor(
    private route: Router,
    private http: HttpClient,
    private matDialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
  }

  ngOnInit() {}

  onDelete() {
    console.log(this.id);
    this.http
      .delete(deleteProduct + this.id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .subscribe((data) => {
        console.log('xoa thanh cong');
        this.closePopup();
        this.reloadComponent();
      });
  }

  onDeleteTmp() {
    console.log(this.id);
    console.log(localStorage.getItem('token'));

    this.http
      .put(putDelProduct + this.id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .subscribe((data) => {
        console.log('xoa tam thoi thanh cong');
        this.closePopup();
        this.reloadComponent();
      });
  }

  reloadComponent() {
    let currentUrl = this.route.url;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([currentUrl]);
  }

  closePopup() {
    this.matDialog.closeAll();
  }
}
