import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})
export class ModalAddComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  AddForm =this.fb.group({
    "name":[""],
    "mumber":[0],
    "mess":[""] ,
    "brand":[""] ,
    "type":[""] ,
  })

  ngOnInit(): void {
  }
  onSubmit =()=>{
    console.log(this.AddForm.value)

  }
}
