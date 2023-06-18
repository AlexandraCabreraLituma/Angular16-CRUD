import { Component } from '@angular/core';
import {NgFor} from '@angular/common';
import {FormGroup,FormBuilder,Validators, FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {ApiService} from "../services/api.service";
import {MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  freshnessList=["Bran new","Second Hnad","Refurbished"]
  productForm !:FormGroup;
  constructor(private formBuilder:FormBuilder,
              private api:ApiService,
              private dialogRef:MatDialogRef<DialogComponent>) {

  }
  ngOnInit():void{
    this.productForm=this.formBuilder.group({
      productName:['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price:['',Validators.required ],
      date:['',Validators.required ]
    })

  }
  addProduct(){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value).subscribe({
        next:(res)=>{
          alert("Procut added successfully");
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          console.log("error")
        }
      })
    }
  }
}
