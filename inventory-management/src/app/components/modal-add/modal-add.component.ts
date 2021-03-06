import { Router } from '@angular/router';
import { postProduct } from './../../services/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  getAllBrands,
  getUserName,
  getProductById,
  getAllCategories,
  getCategoriesByBrandId,
} from 'src/app/services';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss'],
})
export class ModalAddComponent implements OnInit {
  addForm: FormGroup;
  userName = '';
  brands: any;
  categories: any;
  selected: number;
  brandId: any;
  message = '';
  cateId: any;

  constructor(
    private http: HttpClient,
    private matdialog: MatDialog,
    public formBuilder: FormBuilder,
    private route: Router,
    private diag: MatDialogRef<ModalAddComponent>
  ) {
    this.addForm = this.formBuilder.group({
      Name: [''],
      Quantity: [0],
      Description: [''],
      CategoryId: [1],
      BrandId: [1],
    });
  }

  ngOnInit() {
    //get brand
    this.http
      .get(getAllBrands, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .subscribe((res) => {
        this.brands = res;
        console.log('brand: ', res);
      });

    this.http
      .get(getCategoriesByBrandId + 1, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .subscribe((res) => {
        this.categories = res;

        console.log('categories 002: ', this.categories);
      });
  }

  onAdd = () => {
    if (this.addForm.valid) {
      // console.log(this.cateId);
      // return;
      var formData: any = new FormData();
      formData.append('Name', this.addForm.get('Name')?.value);
      formData.append('Quantity', this.addForm.get('Quantity')?.value);
      formData.append('Description', this.addForm.get('Description')?.value);
      formData.append('CategoryId', this.cateId);
      formData.append('BrandId', this.brandId);
    }

    this.http
      .post(postProduct, formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .subscribe(
        {
          next: (res) => {
            console.log(res);
            this.message = 'Th??m s???n ph???m th??nh c??ng';
            this.closePopup(false, this.message);
            this.reloadComponent();
          },
          error: (err) => {
            console.log(err);
            this.message = 'Th??m s???n ph???m kh??ng th??nh c??ng';
            this.closePopup(true, this.message);
          },
        }
      );
  };

  onBrandChange = (id: any) => {
    // console.log(this.addForm.get('brand'))
    console.log(typeof id.target.value);
    this.brandId = id.target.value;
    console.log(this.brandId);
    this.http
      .get(getCategoriesByBrandId + id.target.value, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .subscribe((res) => {
        this.categories = res;
        // this.brandId = this.categories.brandId;

        console.log('categories: ', this.categories);
      });
  };

  onCategoryChange = (id: any) => {
    // console.log(this.addForm.get('brand'))
    console.log(id.target.value);
    this.cateId = id.target.value;
    console.log('cateId: ', this.cateId);
  };

  reloadComponent() {
    let currentUrl = this.route.url;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([currentUrl]);
  }

  closePopup(error?: boolean, message?: string) {
    this.diag.close({
      isError: error,
      message: message
    });
  }
}
