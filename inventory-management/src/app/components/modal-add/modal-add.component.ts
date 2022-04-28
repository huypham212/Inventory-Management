import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { getAllBrands, getUserName, getProductById, getAllCategories, getCategoriesByBrandId } from 'src/app/services';


@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})
export class ModalAddComponent implements OnInit {
  addForm: FormGroup
  userName = ''
  brands: any
  categories: any
  selected:number

  constructor(private http: HttpClient, private matdialog: MatDialog, public formBuilder: FormBuilder) {
    this.addForm = this.formBuilder.group({
      name : [''],
      quantity: [0],
      description:[''],
      userUpdate:[''],
      updateDate:[''],
      status:[''],
      userCreate:[''],
      createDate:[''],
      categoryId:[1],
      brandID:[1]
    })
  }

  ngOnInit() {
    console.log(new Date().toString())

    //get brand
    this.http.get(getAllBrands, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).subscribe(res => {
      this.brands = res
      console.log("brand: ", res)
    })

    // get categories
    

    //get username
    // this.http.get(getUserName,{
    //   headers: {
    //     "Authorization": "Bearer " + localStorage.getItem("token")
    //   }
    // }).subscribe((res) => {
    //   console.log("username: ", res)
    // })

  }
  
 
  onAdd = () => {
    if(this.addForm.valid){
      var formData : any = new FormData();
      formData.append('name', this.addForm.get('name')?.value);
      formData.append('quantity', this.addForm.get('quantity')?.value);
      formData.append('description', this.addForm.get('description')?.value);
      formData.append('updateDate', '');
      formData.append('userUpdate', '');
      formData.append('status', 0);
      formData.append('userCreate', this.userName);
      formData.append('createDate', new Date().getUTCDate().toString());
      formData.append('categoryId', this.addForm.get('categoryId')?.value)
      formData.append('brandID', 1)
    }

    console.log(formData);
    
   }


   onBrandChange = (id:number) => {
    // console.log(this.addForm.get('brand'))
    console.log(id)
    
    this.http.get(getCategoriesByBrandId + id, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).subscribe((res) => {
      this.categories = res
      console.log("categories: ", this.categories)
    })
   }
   
}
