import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { deleteProduct, putDelProduct } from 'src/app/services';
import { UpdateModalComponent } from '../update-modal/update-modal.component';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  id: number;
  message: string
  constructor(
    private route: Router,
    private http: HttpClient,
    private matDialog: MatDialog,
    private diag: MatDialogRef<UpdateModalComponent>,
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
        this.message = "Xóa vĩnh viễn thành công"
        this.closePopup(this.message);
        this.reloadComponent();
      });
  }

  onDeleteTmp() {
    this.http.put(putDelProduct + this.id, "", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }).subscribe((res) => {
      this.message = 'Xóa tạm thời thành công';
      this.closePopup(this.message);
      this.reloadComponent();
    })
  }

  reloadComponent() {
    if (this.data.isFromDetail) {
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigate(['/dashboard-page']);
    }
    else {
      let currentUrl = this.route.url;
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigate([currentUrl]);
    }
  }

  closePopup(mess?: string) {
    this.diag.close({
      message: mess
    });
  }
}
