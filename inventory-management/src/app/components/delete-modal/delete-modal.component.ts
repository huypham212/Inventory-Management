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

  ngOnInit() { }

  onDelete() {
    console.log(this.id);
    this.http
      .delete(deleteProduct + this.id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .subscribe((data) => {
        console.log('Xóa thành công');
        this.closePopup();
        this.reloadComponent();
      });
  }

  onDeleteTmp() {
    this.http.put(putDelProduct + this.id, "", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }).subscribe((res) => {
      console.log('Xóa tạm thời thành công');
      this.closePopup();
      this.reloadComponent();
    })
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
