import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getAllBrands, getCategoriesByBrandId } from 'src/app/services';
import { getProductById, putProduct, getAllCategories } from './../../services/index';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent implements OnInit {
  updateForm: FormGroup
  formData: any = new FormData()
  productData: any
  productId: number
  productBrandId: number
  productCategoryId: number
  brands: any
  categories: any
  selected: number
  brandId: number


  constructor(private route: Router, private http: HttpClient, private matDialog: MatDialog, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public formBuilder: FormBuilder) {
    this.productId = data.productId
    this.updateForm = this.formBuilder.group({
      Name: [''],
      Quantity: [0],
      Description: [''],
      CategoryId: [0],
      BrandId: [0]
    })
  }

  ngOnInit(): void {
    //Get All Brands
    this.http.get(getAllBrands, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).subscribe(res => {
      this.brands = res
    })

    //Get Product by Id
    this.http.get(getProductById + this.productId, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }).subscribe((res) => {
      this.productData = res
      // console.log(this.productData)

      for (let key in this.brands) {
        let value = this.brands[key]

        if (value.name === this.productData.resultObj.brandName) {
          this.productBrandId = value.id
        }
      }

      //Get Category by brand Id
      this.http.get(getCategoriesByBrandId + this.productBrandId, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      }).subscribe((res) => {
        this.categories = res

        for (let key in this.categories) {
          let value = this.categories[key]

          if (value.name === this.productData.resultObj.categoryName) {
            console.log(value.id)
            this.productCategoryId = value.id
          }

        }
      })

      //Send value to form
      this.updateForm = this.formBuilder.group({
        Name: [this.productData.resultObj.name],
        Quantity: [this.productData.resultObj.quantity],
        Description: [this.productData.resultObj.description],
        CategoryId: [this.productCategoryId],
        BrandId: [this.productBrandId]
      })
    })
  }

  onUpdate = () => {
    console.log("Cat: ", this.updateForm.get('CategoryId')?.value)
    if (this.updateForm.valid) {
      var formData: any = new FormData();
      formData.append('Name', this.updateForm.get('Name')?.value);
      formData.append('Quantity', this.updateForm.get('Quantity')?.value);
      formData.append('Description', this.updateForm.get('Description')?.value);
      formData.append('CategoryId', this.updateForm.get('CategoryId')?.value)
      formData.append('BrandId', this.productBrandId)
    }

    this.http.put(putProduct + this.productId, formData, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }).subscribe((res) => {
      console.log(res)
      this.closePopup();
      this.reloadComponent();
    })
  }

  onBrandChange = (id: any) => {
    // console.log(this.addForm.get('brand'))
    console.log(id.target.value)
    this.productBrandId = id.target.value
    this.http.get(getCategoriesByBrandId + id.target.value, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).subscribe((res) => {
      this.categories = res
      console.log("categories: ", this.categories)
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
