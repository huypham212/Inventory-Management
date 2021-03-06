import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { getDateString, getAllProduct } from 'src/app/services';
import { UpdateModalComponent } from './../../components/update-modal/update-modal.component';
import { DeleteModalComponent } from './../../components/delete-modal/delete-modal.component';
import { ModalAddComponent } from './../../components/modal-add/modal-add.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

interface defineDataCsv {
  name: string;
  quantity: number;
  userCreate: string;
  createDate: string;
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  search = '';
  message = '';
  pathQuery = '';
  config: any;
  total = 0;
  valueSortName = 0;
  valueSortDate = 0;
  initialSuggestion: string[] = [];
  suggestion: string[] = [];
  data: any[] = [];
  dataTmp: any[] = [];
  exportResult: defineDataCsv[] = [];
  resResult: any[] = [];

  constructor(
    private http: HttpClient,
    private matDialog: MatDialog,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.total,
    };
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') !== '') {
      // this.messageExport = '';
      this.http
        .get(getAllProduct, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .subscribe((res) => {
          this.resResult = [res];

          this.data = this.resResult[0].items;
          this.total = this.data.length;
          this.data.forEach((element) => {
            this.initialSuggestion.push(element.name);
          });
        });
      // this.onMess();
    } else {
      this.router.navigate(['']);
    }
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

    this.http
      .get(getAllProduct, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .subscribe((res) => {
        this.resResult = [res];
        this.data = this.resResult[0].items;

        this.valueSortDate = 1;
        this.data = this.onDateSort();
        this.suggestion = [];

        this.config.totalItems = this.data.length;
        this.config.currentPage = 1;
      });
  };

  changeFormatDate = (value: string) => {
    let newDate = new Date(value);
    // console.log(newDate.toLocaleString());
    return getDateString(newDate.toLocaleString());
    // return value
  };

  onKeyPress = (key: any, search: string) => {
    if (key.keyCode === 13) {
      this.search = search;
      this.pathQuery = '?Keyword=' + search;

      this.http
        .get(getAllProduct + this.pathQuery, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .subscribe((res) => {
          this.resResult = [res];

          this.data = this.resResult[0].items;
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
      headers: ['T??n s???n ph???m', 'S??? l?????ng', 'Ng?????i t???o', 'Th???i gian t???o'],
    };

    this.exportResult = [];
    this.data.forEach((element) => {
      this.exportResult.push({
        name: element.name,
        quantity: element.quantity,
        userCreate: element.userCreate,
        createDate: this.changeFormatDate(element.createDate),
      });
    });
    new AngularCsv(this.exportResult, 'Data File', options);
    this.toastr.success("Xu???t th??nh c??ng");
  };

  onNameSort = () => {
    switch (this.valueSortName) {
      case 0:
        if (this.search === '') {
          this.pathQuery = '?SortOrder=name_asc';
        } else {
          this.pathQuery = '?Keyword=' + this.search + '&SortOrder=name_asc';
        }

        this.http
          .get(getAllProduct + this.pathQuery, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .subscribe((res) => {
            this.resResult = [res];

            this.data = this.resResult[0].items;
          });

        this.valueSortName++;
        break;
      case 1:
        if (this.search === '') {
          this.pathQuery = '?SortOrder=name_desc';
        } else {
          this.pathQuery = '?Keyword=' + this.search + '&SortOrder=name_desc';
        }

        this.http
          .get(getAllProduct + this.pathQuery, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .subscribe((res) => {
            this.resResult = [res];

            this.data = this.resResult[0].items;
          });

        this.valueSortName++;
        break;
      case 2:
        if (this.search === '') {
          this.pathQuery = '?SortOrder=date_desc';
        } else {
          this.pathQuery = '?Keyword=' + this.search + '&SortOrder=date_desc';
        }

        this.http
          .get(getAllProduct + this.pathQuery, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .subscribe((res) => {
            this.resResult = [res];

            this.data = this.resResult[0].items;
          });

        this.valueSortName = 0;
        break;
    }
  };

  onDateSort = () => {
    switch (this.valueSortDate) {
      case 0:
        if (this.search === '') {
          this.pathQuery = '?SortOrder=date_asc';
        } else {
          this.pathQuery = '?Keyword=' + this.search + '&SortOrder=date_asc';
        }

        this.http
          .get(getAllProduct + this.pathQuery, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .subscribe((res) => {
            this.resResult = [res];

            this.data = this.resResult[0].items;
          });

        this.valueSortDate++;
        break;
      case 1:
        if (this.search === '') {
          this.pathQuery = '?SortOrder=date_desc';
        } else {
          this.pathQuery = '?Keyword=' + this.search + '&SortOrder=date_desc';
        }

        this.http
          .get(getAllProduct + this.pathQuery, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .subscribe((res) => {
            this.resResult = [res];

            this.data = this.resResult[0].items;
          });

        this.valueSortDate = 0;
        break;
    }

    return this.data;
  };

  onRowClick = (id: number) => {
    this.router.navigate(['/detail-page', id]);
  };

  onAdd = () => {
    const dialogRef = this.matDialog.open(ModalAddComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('day la thong bao' + JSON.stringify(result.message));
      this.message = result.message;
      if (result.isError) {
        this.toastr.error(this.message);
      }
      else {
        this.toastr.success(this.message);
      }
    });
  };

  onUpdate = (id: number) => {

    const dialogRef = this.matDialog.open(UpdateModalComponent, {
      data: {
        productId: id,
        isFromDetail: false
      },
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log('day la thong bao' + JSON.stringify(result.message));
        this.message = result.message;
        if (result.isError) {
          this.toastr.error(this.message);
        }
        else {
          this.toastr.success(this.message);
        }

      }
    );
  };

  onDelete = (idDlt: number) => {
    const dialogRef = this.matDialog.open(DeleteModalComponent, {
      data: {
        id: idDlt,
        isFromDetail: false
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('day la thong bao' + JSON.stringify(result.message));
      this.message = result.message;
      if (result.isError) {
        this.toastr.error(this.message);
      }
      else {
        this.toastr.success(this.message);
      }
    });
  };
}
